angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('ContactCtrl', function($scope, $ionicLoading) {
    
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

.controller('TripsCtrl', function($scope) {
  $scope.trips = [
    { title: 'volunteer', id: 1 },
    { title: 'ecotourism', id: 2 },
    { title: 'tourism', id: 3 },
    { title: 'insolite', id: 4 },
    { title: 'plage', id: 5 }
  ];
})

.controller('ListsCtrl', function($scope, $stateParams) {

})

.controller('DetailsCtrl', function($scope, $stateParams) {
})

