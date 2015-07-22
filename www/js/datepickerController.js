angular.module('starter.controllers', [])

 $scope.currentDate = new Date();

  $scope.datePickerCallback = function (val) {
      if(typeof(val)==='undefined'){      
          console.log('Date not selected');
      }else{
          console.log('Selected date is : ', val);
      }
  };

})