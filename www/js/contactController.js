angular.module('starter.controllers', [])

.controller('ContactCtrl', function($scope, $ionicLoading) {
   $scope.toggleItem = function(item){
    item.checked = !item.checked;
  };
  
  $scope.data = {
    showDelete: false
  };
  
  $scope.itemButtons = [
    {
      text: 'Edit',
      type: 'button-assertive',
      onTap: function(item) {
        alert('Edit Item: ' + item.id);
      }
    },
    {
      text: 'Share',
      type: 'button-calm',
      onTap: function(item) {
        alert('Share Item: ' + item.id);
      }
    }
  ];
  
  $scope.onItemDelete = function(item) {
    $scope.items.splice($scope.items.indexOf(item), 1);
  }; 
  $scope.message = {
    'name' : '',
    'email' : '',
    'subject' : '',
    'body' : ''
  };
  
  $scope.finalSubmit = function() {
    $ionicLoading.show({ template: 'Submitting...', duration: 1500})
  }
  
  
})

.directive('formManager', function($ionicLoading) {
  return {
    restrict : 'A',
    controller : function($scope) {
      
      $scope.$watch('faleComigoForm.$valid', function() {
        console.log("Form validity changed. Now : " + $scope.faleComigoForm.$valid);
      });
      
      $scope.submit = function() {
        
        if($scope.faleComigoForm.$valid) {
          $scope.finalSubmit();
        } else {
          $ionicLoading.show({ template: 'Form Is Not Valid', duration: 1500})
        }

        
      }
    }
  }
})