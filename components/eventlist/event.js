"use strict";

let eventList = {
    bindings: "",
    templateUrl: "components/eventlist/event.html",
    controller: ["TicketService", "$location", function (TicketService, $location) {
        const vm = this;
        vm.show = null;
        vm.searchInfo = TicketService.getObject();
        vm.favClick = (index) => {
            TicketService.bucketlist.push(index);
        }
        vm.moreInfo = (index) => {
            vm.show = index;
        }
        vm.closeInfo = () => {
            vm.show = null;
        }
        vm.changePath = (path) => {
            $location.path(path);
        }

    }]

}

angular
    .module("app")
    .component("eventList", eventList);