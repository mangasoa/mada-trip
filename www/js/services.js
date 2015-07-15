angular.module('starter.services', [])

.factory("FriendsService", function ($http, $q,$filter,$firebaseArray) {

  var ref = new Firebase('https://my-madagascar-trip.firebaseio.com/');
  var array = $firebaseArray(ref);


  console.log(array)
  

  return {

    getGroupedFriends: function () {

      return array;
      

    },

    getFriends: function() {
      return array
      //return $http.get("api/datasVoyage.json");
    }
  }

});