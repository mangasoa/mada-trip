angular.module('starter.controllers')
.controller('FormMap', function($rootScope,$scope, $ionicLoading, $compile, $firebaseArray) 
{
	//variables du filtre
	$rootScope.formModel = {
		voyageType:'0',
		region:''
	}
});
