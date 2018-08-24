"use strict";

function TicketService($http, ) {
    let vm = this;
    vm.requestData = (inter, city, fdat, ldat) => {
        let interUri = "";
        let cityUri = "";
        let objec = null; 
        function pad(number) {
            if (number < 10) {
              return '0' + number;
            }
            return number;
          }
      
          Date.prototype.toISOString = function() {
            return this.getUTCFullYear() +
              '-' + pad(this.getUTCMonth() + 1) +
              '-' + pad(this.getUTCDate()) +
              'T' + pad(this.getUTCHours()) +
              ':' + pad(this.getUTCMinutes()) +
              ':' + pad(this.getUTCSeconds()) +
              'Z';
          };

        let nfdat = fdat.toISOString();
        let nldat = encodeURIComponent(ldat.toISOString());
        if(typeof inter === "string" && typeof city === "string"){
            interUri = encodeURIComponent(inter);
            cityUri = encodeURIComponent(city);
        }
        else{
            return;
        }
        return $http({
            method: "GET", 
            url: `http://www.mapquestapi.com/geocoding/v1/address?key=UVCEFSBIBDJSVsEsVI6ylKaTyFS4h2kQ&location=${cityUri}`
        }).then((response) => {
            if(response == undefined){
                return;
            }
            console.log(response.data.results[0].locations); 
            let lat = response.data.results[0].locations[0].displayLatLng.lat; 
            let lon = response.data.results[0].locations[0].displayLatLng.lng;
            if( lon === -99.066067 && lat === 39.390897 ){
                return; 
            }
            let rep = [lat, lon];
           
            return rep;
            console.log(lat + " " + lon); 
        }).then((rep) => {
            let latlon = rep[0] + "," + rep[1]; 
            console.log(typeof latlon + " " + latlon);
            console.log(rep);
            return $http({
                method: "GET", 
                url: `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${interUri}&latlong=${latlon}&radius=150&startDateTime=${nfdat}&endDateTime=${nldat}&apikey=U7tG9w7O8UpfeSNk3oaR43EUFk1rMyoA`
            }).then((response) => {
                    console.log(interUri, cityUri, nfdat, nldat);
                    vm.objec = response.data;
                    console.log(vm.objec._embedded.events);
                    //$location.path();
                    return vm.objec;
                });
        });
        // return $http({
        // method: "GET",
        // url: `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${interUri}&city=${cityUri}&startDateTime=${nfdat}&endDateTime=${nldat}&apikey=U7tG9w7O8UpfeSNk3oaR43EUFk1rMyoA`
        // }).then((response) => {
        //     console.log(interUri, cityUri, nfdat, nldat);
        //     vm.objec = response.data;
        //     console.log(vm.objec._embedded.events);
        //     //$location.path();
        //     return vm.objec;
        // });
        // return $http({
        //     method: "GET", 
        //     url: `http://www.datasciencetoolkit.org/maps/api/geocode/json?sensor=false%20&address=${cityUri}`
        // }).then((response) => {
        //     console.log(response); 
        // });
    };
    vm.bucketlist = [];
    vm.updateObject = (obj) => {
        vm.objec = obj;
    }
    vm.getObject = () => {
        return vm.objec._embedded.events;
    }
}


angular
    .module("app")
    .service("TicketService", TicketService);