(function() {
	'use strict';
	angular
		.module('foodTruckApp')
		.service('MapService', 

	function MapService($log, $firebaseObject, fb) {
		
		var ref = new Firebase(fb.url);     
    var data = $firebaseObject(ref);

		this.logger = function() {
			$log.log('hello from service');
		};

    this.getLocation = function() {
        console.log('loading location...')
        navigator.geolocation.getCurrentPosition(function gettinLocation(position){
         var location = {}
         location.lat = position.coords.latitude;
         location.lon = position.coords.longitude;
         // $scope.setMarker(location);
         getLocationFromFireBase(location);
        });
    };

		this.getLocationFromFireBase = function(location) {
			data.$loaded().then(function(){
			    console.log(location)
			    data.location = location || {};
			    data.$save();
			});
		};
	})
})();