(function() {
	'use strict';
	angular
		.module('foodTruckApp')
		.service('LocationService', 

	function LocationService($log, $firebaseObject, FIREBASE) {
		var self = this,
		    ref = new Firebase(FIREBASE.url),     
        data = $firebaseObject(ref);

    self.saveLocationToFirebase = function(location) {
      data.$loaded().then(function(){
          console.log('save location to firebase', location);
          data.location = location || {};
          data.$save();
      });
    };

    self.getLocation = function() {
        console.log('loading location...')
        navigator.geolocation.getCurrentPosition(function gettingLocation(position){
          var location = {};
          location.lat = position.coords.latitude;
          location.lon = position.coords.longitude;
          self.saveLocationToFirebase(location);
        });
    };
	})
})();