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
  $ionicModal.fromTemplateUrl('templates/Menuside/login.html', {
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

  // start datepicker
  $scope.currentDate = new Date();

  $scope.datePickerCallback = function (val) {
      if(typeof(val)==='undefined'){      
          console.log('Date not selected');
      }else{
          console.log('Selected date is : ', val);
      }
  };

})

        //Start contact Controller

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

              //start HomeTrips Controller

.controller('TripsCtrl', function($scope, $firebaseArray, $state) {
  var ref = new Firebase('https://my-madagascar-trip.firebaseio.com/locationTypes');
  $scope.trips = $firebaseArray(ref);
  $scope.trips.$loaded;

  $scope.goTo = function(typeName) {
    $state.go('app.list',{type:typeName});
  }

})

            //start Lists controller

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
    $state.go('app.detail', {detailId: id});
  }
})

            //start Details controller

.controller('DetailsCtrl', function($scope, $stateParams, $firebaseArray, $firebaseObject) {
  console.log($stateParams.detailId);
  console.log($stateParams.type);
  var ref = new Firebase('https://my-madagascar-trip.firebaseio.com/locationLists');
  lists = $firebaseArray(ref);
  lists.$loaded().then(function(data){
    $scope.detail;
    for(var i=0;i<lists.length;i++){
      if(lists[i].id == $stateParams.detailId){
        $scope.detail = lists[i];
        break;
      }
    }
    console.log($scope.detail);
    var refLocation = new Firebase("https://my-madagascar-trip.firebaseio.com/locations/"+$scope.detail.location);
    $scope.location = $firebaseObject(refLocation);
 })
})

