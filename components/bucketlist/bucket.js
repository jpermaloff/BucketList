"use strict"; 

const bucketlistPage = {

    templateUrl: "components/bucketlist/bucket.html",
    controller: ["TicketService", "$location", function(TicketService, $location) {
        const vm = this;
        vm.list = TicketService.bucketlist;
        vm.delete = (index) => {
            vm.list.splice(index, 1);
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
    .component("bucketlistPage", bucketlistPage); 

