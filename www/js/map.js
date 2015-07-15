angular.module('madamap.controllers', ['starter.controllers','starter'])

.controller('MadaMapCtrl', function($scope, $ionicLoading, $compile, $firebaseArray) 
{
	var ref = new Firebase("https://my-madagascar-trip.firebaseio.com/locations");
	//Liste des fenêtres qui contiennent la description de la randonnée
	var infoWindows = [];
	//télécharger les données 
	$scope.locations = $firebaseArray(ref);

	$scope.locations.$loaded()
	.then(function()
	{
		var myLatlng = new google.maps.LatLng(-18.766947, 46.869107);

		var mapOptions = 
		{
		center: myLatlng,
		zoom: 6,
		mapTypeId: google.maps.MapTypeId.ROADMAP
		};

	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	//Afficher les trips sur la carte
		for (var i=0; i<$scope.locations.length; i++)
		{
			var marker = new google.maps.Marker({
				position: { lat: parseFloat($scope.locations[i].lat), lng:parseFloat($scope.locations[i].lng)},
				map: map,
				title: $scope.locations[i].nom
			});
			
		//$scope.locations[i].marker = marker;
				//Element Ã  Afficher dans infowindow
				var typeTop="";
				if (location.type_top==19) 
					typeTop="Ideal pour famille";
				else if (location.type_top==21)
					typeTop="Ideal pour groupe";
				else if (location.type_top==23)
					typeTop="Ideal pour solo";
				
				
				var content = '<div id="content">'+
								'<div id="siteNotice">'+ 
								'</div>'+
								'<div id="firstHeading" class="firstHeading">' + $scope.locations[i].nom + '</div>'+
								'<div id="typitopi">' + typeTop + '</div>'+
								'<img class="imageInfoWindow" src="img/' + $scope.locations[i].imgwindow +'" height="142" width="22">'+
								'<div>' + $scope.locations[i].description + '</div>'+				
							   '</div>';

				var infowindow = new google.maps.InfoWindow();
				
				infoWindows.push(infowindow); 
				
				google.maps.event.addListener(marker,'click', (function(marker,content,infowindow)
				{ 
					return function() 
					{
						// Fermer toutes les fenÃƒÂªtres
						for (var i=0;i<infoWindows.length;i++) 
						{
							infoWindows[i].close();
						}
						
						infowindow.setContent(content);
						infowindow.open(map,marker);
					};
				}) (marker,content,infowindow));  
		  
   		 }
	 	$scope.map = map;		 	  
	 })
		.catch(function(err)
	{
		console.error(err);
	});

		$scope.centerOnMe = function () {
			console.log("Centering");
			if (!$scope.map) {
				return;
			}

			$scope.loading = $ionicLoading.show({
				content: 'Getting current location...',
				showBackdrop: false
			});

			navigator.geolocation.getCurrentPosition(function (pos) {
				console.log('Got pos', pos);
				$scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
				$ionicLoading.hide();
			}, function (error) {
				alert('Unable to get location: ' + error.message);
			});
		};
});

