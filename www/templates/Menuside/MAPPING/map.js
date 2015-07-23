angular.module('madamap.controllers', ['starter.controllers','starter'])
.controller('MadaMapCtrl', function($rootScope,$scope, $ionicLoading, $compile, $firebaseArray) 
{

	
	var default_image = 'img/flower.png';
	var cyclone_image = 'img/cyclone2.png';
	var region_cyclone = Array(7,8,9,10,12,13,14,15);
	

	$scope.defaultIcon =[default_image];
	


	$scope.iconsMarkers = [];

	$scope.currentDate = new Date();
	$scope.title = "Custom Title";

	$scope.datePickerCallback = function (val) {
	    if(typeof(val)==='undefined'){      
	        console.log('Date not selected');
	    }else{
	        console.log('Selected date is : ', val);
	    }
	}	


	$rootScope.$watch('formModel.voyageType', function(newValue, oldValue) {

		console.log('formModel voyageType new value ', newValue);

		//Récupérer les données
		var ref = new Firebase("https://my-madagascar-trip.firebaseio.com/locations");
		$scope.locations = $firebaseArray(ref);
		$scope.locations.$loaded()
		.then(function(){
			$scope.locationsF = [];
			for(var i=0;i<$scope.locations.length;i++){
				var type = $scope.locations[i].type.split(',');
				for(var j=0;j<type.length;j++){
					if(type[j] == newValue){
						$scope.locationsF.push($scope.locations[i]);
						break;
					}
				}
			}

			$scope.iconsMarkers = [];
			$scope.icons = [];
			for (var k=0; k<$scope.locationsF.length; k++)
			{

				$scope.iconsMarkers.push({
			        id: k,
			        icon:default_image,
			        coords: {
			            latitude: parseFloat($scope.locations[k].lat),
			            longitude: parseFloat($scope.locations[k].lng)
			        }
			    });


			    console.log("-- -> ",$scope.iconsMarkers)
			}


		})
	});


	$scope.map = { center: { latitude: -18.766947, longitude: 46.869107 }, zoom: 6 };

		

});


