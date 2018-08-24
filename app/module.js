"use strict"; 

function pad(number) {
  if (number < 10) {
    return '0' + number;
  }
  return number;
}//Add function to pad numbers less than 10 with a leading zero 

Date.prototype.toISOShortString = function() {
  return this.getUTCFullYear() +
    '-' + pad(this.getUTCMonth() + 1) +
    '-' + pad(this.getUTCDate()) +
    'T' + pad(this.getUTCHours()) +
    ':' + pad(this.getUTCMinutes()) +
    ':' + pad(this.getUTCSeconds()) +
    'Z';
};//Add a prototype date method to return ISO standard time formatted without milliseconds

angular
  .module('app', ["ngRoute", "ngAnimate"])
  .config(function($routeProvider){
      $routeProvider
      .when("/search", {
        template: ` <section class="backgroundGradient" id="backgroundGradient"></section>
        <search-criteria></search-criteria>`
      })
      .when("/bucket", {
        template: ` <section class="backgroundGradient" id="backgroundGradient"></section>
        <bucketlist-page></bucketlist-page>`
      })
      .when("/event", {
        template: ` <section class="backgroundGradient" id="backgroundGradient"></section>
        <event-list></event-list>`
      })
      .otherwise({ redirectTo: "/search" });
  }); //The routes
