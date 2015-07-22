angular.module('starter')

.controller('SearchCtrl', function($scope, $firebaseArray, $state) {
  var ref = new Firebase('https://my-madagascar-trip.firebaseio.com/locations');
  $scope.trips = $firebaseArray(ref);
  $scope.trips.$loaded;
  console.log('aaaa');

  $scope.goToDetail = function(id){
  console.log(id);
  $state.go('app.detail', {detailId: id});
}
});

