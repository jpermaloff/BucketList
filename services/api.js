"use strict";

function TicketService($http, $sce, $location) {
    let vm = this;
    vm.requestData = (inter, city, fdat, ldat) => {
        let interUri = "";
        let cityUri = "";
        let objec = null; 
        let nfdat = encodeURIComponent(fdat.toISOShortString());//return standard format of users selected start date
        let nldat = encodeURIComponent(ldat.toISOShortString());//return standard format of users selected end date
       
        if(typeof inter === "string" && typeof city === "string"){
            interUri = encodeURIComponent(inter);
            cityUri = encodeURIComponent(city);
        }//encode the interest and city entries as URI 
        else{
            return;
        }//return if either interest or city are not strings for some reason. 

        vm.bucketlist = [];//initialize empty bucket.
        
        vm.getObject = () => {
            return vm.objec._embedded.events;
        }//function to get object for Event view. 

        let url = 'http://www.datasciencetoolkit.org/maps/api/geocode/json?sensor=false/address=detroit';//Set Url
        let trust = $sce.trustAsResourceUrl(url);//trust url for jsonp request preagular requirements 
        const params = {
            sensor: 'false', 
            address: `${cityUri}`
        }//set parameters to api call. params is an inbuilt object. 

        console.log(angular.callback); 
        return $http.jsonp(trust, {params: params}).then( (response) => {
            if(!response.data.results[0].geometry.location){
                console.log("location not found"); 
                return; 
            }//if the location is not found return the function. 
            let lat =  response.data.results[0].geometry.location.lat;//set lat variable to returned latitude. 
            let lon = response.data.results[0].geometry.location.lng;//set lon variable to returned longitude. 
            let rep = [lat, lon];//make array to pass when promise resolves. 
            return rep; //return array. 
        }).then((rep) => {
                    let latlon = rep[0] + "," + rep[1]; //set value of latlon to correct value to pass in latlon parameter of ticketmaster api.
                    return $http({
                        method: "GET", 
                        url: `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${interUri}&latlong=${latlon}&radius=150&startDateTime=${nfdat}&endDateTime=${nldat}&apikey=U7tG9w7O8UpfeSNk3oaR43EUFk1rMyoA`
                    }).then((response) => {
                                        if(!response.data){
                                            return;
                                        }//return function if ticket master does not return. 
                                        vm.objec = response.data;//set objec variable to current ticket master api return.
                                        $location.path();//change path.
                                        return vm.objec;//return the object.
                                    });
                    });
    }

}

angular
    .module("app")
    .service("TicketService", TicketService);//The module and service


    //     return $http({
    //         method: "GET", 
    //         url: `http://www.mapquestapi.com/geocoding/v1/address?key=UVCEFSBIBDJSVsEsVI6ylKaTyFS4h2kQ&location=${cityUri}`
    //     }).then((response) => {
    //         if(response == undefined){
    //             return;
    //         }
    //         console.log(response.data.results[0].locations); 
    //         let lat = response.data.results[0].locations[0].displayLatLng.lat; 
    //         let lon = response.data.results[0].locations[0].displayLatLng.lng;
    //         if( lon === -99.066067 && lat === 39.390897 ){
    //             return; 
    //         }
    //         let rep = [lat, lon];
           
    //         return rep;
    //         console.log(lat + " " + lon); 
    //     }).then((rep) => {
    //         let latlon = rep[0] + "," + rep[1]; 
    //         console.log(typeof latlon + " " + latlon);
    //         console.log(rep);
    //         return $http({
    //             method: "GET", 
    //             url: `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${interUri}&latlong=${latlon}&radius=150&startDateTime=${nfdat}&endDateTime=${nldat}&apikey=U7tG9w7O8UpfeSNk3oaR43EUFk1rMyoA`
    //         }).then((response) => {
    //                 console.log(interUri, cityUri, nfdat, nldat);
    //                 vm.objec = response.data;
    //                 console.log(vm.objec._embedded.events);
    //                 $location.path();
    //                 return vm.objec;
    //             });
    //     });
    //     return $http({
    //     method: "GET",
    //     url: `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${interUri}&city=${cityUri}&startDateTime=${nfdat}&endDateTime=${nldat}&apikey=U7tG9w7O8UpfeSNk3oaR43EUFk1rMyoA`
    //     }).then((response) => {
    //         console.log(interUri, cityUri, nfdat, nldat);
    //         vm.objec = response.data;
    //         console.log(vm.objec._embedded.events);
    //         //$location.path();
    //         return vm.objec;
    //     });
    // };