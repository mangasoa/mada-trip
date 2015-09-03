angular.module('starter')

.controller('SearchCtrl', function($scope, $firebaseArray, $state) {
  var ref = new Firebase('https://my-madagascar-trip.firebaseio.com/locations');
  $scope.trips = $firebaseArray(ref);
  $scope.trips.$loaded().then(function(){
  	console.log($scope.trips[0].$id);
  })
  //console.log('aaaa');

  $scope.goToDetail = function(id){
  console.log(id);
  $state.go('app.detail', {detailId: id});
}
});

