angular.module('starter')

.controller('DetailsCtrl', function($scope, $stateParams, $firebaseArray) {
  console.log($stateParams.detailId);
  var ref = new Firebase('https://my-madagascar-trip.firebaseio.com/locationLists');
  lists = $firebaseArray(ref);
  lists.$loaded().then(function(data){
    $scope.lists = [];
    for(var i=0;i<lists.length;i++){
      if(lists[i].ListName == $stateParams.type){
        $scope.lists.push(lists[i]);
      }
    }
 })
})

