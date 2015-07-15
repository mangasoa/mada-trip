angular.module('avantvoyage.controllers', [])
	.controller('AvantTripCtrl', function($scope) {
		var groups =[
			{
				name:'Quand partir?',
				description:'Plusieurs variations de Lorem Ipsum peuvent être trouvées ici ou là, mais la majeure partie addition ne ressemblent pas une seconde à du texte standard.',
				image:'http://lorempicsum.com/futurama/100/100/1'
			},
			{
				name:'Avant le départ',
				description:'Plusieurs variations de Lorem Ipsum peuvent être trouvées ici ou là, mais la majeure partie addition ou de mots aléatoires qui ne ressemblent pas une seconde à du texte standard.',
				image:'http://lorempicsum.com/futurama/100/100/2'
			},
			{
				name:'Culture',
				description:'Cool place to see with great robots inside',
				image:'http://lorempicsum.com/futurama/100/100/3'
			},
			{
				name:'Hebergement',
				description:'Cool place to see with great robots inside',
				image:'http://lorempicsum.com/futurama/100/100/4'
			},
			{
				name:'Transport',
				description:'Cool place to see with great robots inside',
				image:'http://lorempicsum.com/futurama/100/100/5'
			},
			{
				name:'Devise',
				description:'Cool place to see with great robots inside',
				image:'http://lorempicsum.com/futurama/100/100/6'
			},
			{
				name:'Partenaires',
				description:'Cool place to see with great robots inside',
				image:'http://lorempicsum.com/futurama/100/100/7'
			},
			{
				name:'Vol',
				description:'Cool place to see with great robots inside',
				image:'http://lorempicsum.com/futurama/100/100/8'
			}
		];

					$scope.groups = groups;
			  for (var i = 0; i < 8; i++) 
			 {
			  		//$scope.groups = groups.concat(groups.slice(0))
			    $scope.groups[i] = {
			     name: i,
			      items: []
			    };
			    for (var j = 0; j < 3; j++) {
			      $scope.groups[i].items.push(i + 'groups.description' +j );
			    }
			  }

			  /*
			   * if given group is the selected group, deselect it
			   * else, select the given group
			   */
			  $scope.toggleGroup = function(group) 
			  {
			    if ($scope.isGroupShown(group)) {
			      $scope.shownGroup = null;
			    } else {
			      $scope.shownGroup = group;
			    }
			  };
			  $scope.isGroupShown = function(group) {
			    return $scope.shownGroup === group;
			  };
	
  	});