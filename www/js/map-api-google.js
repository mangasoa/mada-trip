angular.module('madamap.controllers', ['starter.controllers','starter'])
.controller('MadaMapCtrl', function($rootScope,$scope, $ionicLoading, $compile, $firebaseArray) 
{


    console.log('hello test ') 


	$scope.currentDate = new Date();
	$scope.title = "Custom Title";


    console.log('****** test ',$rootScope)

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
		console.log("ok");
		$scope.locations.$loaded()
		.then(function(){
			console.log("ok");
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

			//Pour afficher icone flower
			var image = default_image;
			var myLatlng = new google.maps.LatLng(-18.766947, 46.869107);
			var mapOptions = {
				center: myLatlng,
				zoom: 5,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			var map = new google.maps.Map(document.getElementById("map"), mapOptions);
			for (var k=0; k<$scope.locationsF.length; k++)
			{
				var marker = new google.maps.Marker({
					position: { lat: parseFloat($scope.locations[k].lat), lng:parseFloat($scope.locations[k].lng)},
					map: map,
					title: $scope.locations[k].nom,
					icon: image
				});
			}
		})
	});



    console.log('******')
	//Début javascript Carte

	var default_image = 'img/flower.png';
	var cyclone_image = 'img/cyclone2.png';
	var region_cyclone = Array(7,8,9,10,12,13,14,15);
	
	//Liste des fenêtres qui contiennent la description de la randonnée
	var infoWindows = [];
	
	//télécharger les données 
	var ref = new Firebase("https://my-madagascar-trip.firebaseio.com/locations");
	$scope.locations = $firebaseArray(ref);
	$scope.locations.$loaded()
	.then(function()
	{
		var myLatlng = new google.maps.LatLng(-18.766947, 46.869107);

		var mapOptions = {
			center: myLatlng,
			zoom: 5,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		// Affficher la carte google maps
		var map = new google.maps.Map(document.getElementById("map"), mapOptions);

		//Pour afficher icone flower
		var image = default_image;

		//Afficher les trips sur la carte
		for (var i=0; i<$scope.locations.length; i++)
		{
			var marker = new google.maps.Marker({
				position: { lat: parseFloat($scope.locations[i].lat), lng:parseFloat($scope.locations[i].lng)},
				map: map,
				title: $scope.locations[i].nom,
				icon: image
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

										//1ère partie recherche générale
/*	$(function()
	{
		$("#choixregion").on('change', rechercher);
		$("#TypeVoyage").on('change', rechercher);	
		$("#date").on('change', rechercher);
	});
	
	function rechercher(e) 
	{
		// Supprimer les choix de la recherche "Ou précisement"
		$("#Voyagefamille").val(-1);
		$("#Voyagegroup").val(-1);
		$("#Voyagesolo").val(-1);
		$("#dureeVoyage").val(-1);
			e.preventDefault();
			//on récupère les valeurs de filtre
			var region_selected = $("#choixregion").val();
			var typevoyage_selected = $("#TypeVoyage").val();
			var datePicker = new Date($("#date").val());
		
			for(var i in locations)
			{				
				var location = locations[i];
				//cacher le lieu
				location.marker.setMap(null);				
				var typevoyage = location.type.split(",");	
				//Afficher icone cyclone si 1.1<date<28.2			
				if (datePicker.getMonth()<2 && region_cyclone.indexOf(parseInt(location.region)) != -1)
				{ 
					location.marker.icon = cyclone_image;
				} else
				{
					location.marker.icon = default_image;
				console.log(region_cyclone.indexOf(location.region));
				}
				//afficher le lieu s'il correspond aux critères
				if(
				(location.region == region_selected || region_selected == "affichertous") && 	//filtre region
				(typevoyage.indexOf(typevoyage_selected) != -1 || typevoyage_selected == "affichertous")  //&& recherche dans 1 tab et filtre type
				//(location.duree == dureeVoyage_selected || dureeVoyage_selected == "affichertous")//filtre incontournable_dureecircuit
				)
					location.marker.setMap(map);									
			  }	
		}
		
						//2ème partie recherche "Ou précisément"

	$("#Voyagefamille").on('change', recherche_precise);
	$("#Voyagegroup").on('change', recherche_precise);
	$("#Voyagesolo").on('change', recherche_precise);
	$("#dureeVoyage").on('change', recherche_precise);
	
	function recherche_precise(e) 
	{
		// Supprimer les choix de la recherche simple
		$("#choixregion").val(-1);
		$("#TypeVoyage").val(-1);
		$("#date").val('');
			e.preventDefault();
			//on récupère les valeurs de filtre
		
			var voyagefamily_selected = $("#Voyagefamille").val();
			var voyagegroup_selected = $("#Voyagegroup").val();
			var voyagesolo_selected = $("#Voyagesolo").val();
			var dureeVoyage_selected = $("#dureeVoyage").val();
			
			// Construire les choix des tops voulus:
			var choixTops = new Array();
			if (voyagefamily_selected=="19") choixTops.push("19");
			if (voyagegroup_selected=="21") choixTops.push("21");
			if (voyagesolo_selected=="23") choixTops.push("23");
			//if(dureeVoyage_selected==17) choixTops.push(initTriangles());
			for(var i in locations)
			{				
				var location = locations[i];
				//cacher le lieu
				location.marker.setMap(null);	
							
				//var typefamily = location.typefamily.split(",");
				//var voyagegroup = location.typegroup.split(",");
				//var voyagesolo = location.typesolo.split(",");				
				//afficher le lieu s'il correspond aux critères
				//location.marker.setMap(map);
				
				// Si aucun choix de top:
				//console.log(location.type_top);
				//console.log(choixTops.indexOf(location.type_top));
				if (choixTops.length==0) 
				{
					//console.log("tab vide");
					location.marker.setMap(map);			
					
				} 
				else if (choixTops.indexOf(location.type_top) != -1)
				{
					// La location fait partie des tops recherchés:
					location.marker.setMap(map);			
				}
			}
			//Aficher triangle quand on selectionne circuit 1mois+
			if(dureeVoyage_selected=="17")
			{
				triangleParcours.setMap(map);
				triangleParcours1.setMap(map);
				triangleParcours2.setMap(map);
				triangleParcours3.setMap(map);
			} else {
				triangleParcours.setMap(null);
				triangleParcours1.setMap(null);
				triangleParcours2.setMap(null);
				triangleParcours3.setMap(null);
			}
		//Aficher circuit quand on selectionne circuit 3mois+
			if(dureeVoyage_selected=="18")
			{
				circuitParcours.setMap(map);
				circuitParcours1.setMap(map);
				circuitParcours2.setMap(map);
				circuitParcours3.setMap(map);
				
			} else
				{
				circuitParcours.setMap(null);
				circuitParcours1.setMap(null);
				circuitParcours2.setMap(null);
				circuitParcours3.setMap(null);
			}
		}
}


//Affichage traitement données
function dessinerPositions() 
{
 	var position = new google.maps.LatLng(-13.612849, 48.431719);
	var marker = new google.maps.Marker
	({
	 position: position,
      map: map,
      title: 'Hello World!'
  	});
};

	
google.maps.event.addDomListener(window, 'load', initialize);*/


