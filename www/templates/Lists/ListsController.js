angular.module('starter.Volontourisme', [])

.controller('ListsCtrl', function($scope, $state, $stateParams, $firebaseArray) {
  var ref = new Firebase('https://my-madagascar-trip.firebaseio.com/locationLists');
  lists = $firebaseArray(ref);
  lists.$loaded().then(function(data){
    $scope.lists = [];
    for(var i=0;i<lists.length;i++){
      if(lists[i].ListName == $stateParams.type){
        $scope.lists.push(lists[i]);
      }
    }
  });

  $scope.goToDetail = function(id){
    console.log(id);
    $state.go('app.list.detail', {detailId: id});
  }
})