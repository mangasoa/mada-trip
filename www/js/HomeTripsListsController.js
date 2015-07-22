.controller('TripsCtrl', function($scope, $firebaseArray, $state) {
  var ref = new Firebase('https://my-madagascar-trip.firebaseio.com/locationTypes');
  $scope.trips = $firebaseArray(ref);
  $scope.trips.$loaded;

  $scope.goTo = function(typeName) {
    $state.go('app.list',{type:typeName});
  }

})