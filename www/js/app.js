// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','starter.controllers','madamap.controllers','firebase','avantvoyage.controllers','ionic-datepicker'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/Menuside/menu.html",
    controller: 'AppCtrl'
  })

/* Start router HOME page- Annonce top favoris-recommandation-coups de coeur etc...*/  
  .state('app.trips', {
      url: "/trips",
      views: {
        'menuContent': {
          templateUrl: "templates/HomeTripsLists/trips.html",
          controller: 'TripsCtrl'
        }
      }
    })

/* Start search*/  
  .state('app.search', {
      url: "/search",
      views: {
        'menuContent': {
          templateUrl: "templates/Search/search.html",
          controller: 'SearchCtrl'
        }
      }
    })

/* end router HOME page*/

/* start router menu left*/
  .state('app.apropos', {
    url: "/apropos",
    views: {
      'menuContent': {
        templateUrl: "templates/Menuside/apropos.html"
      }
    }
  })

 .state('app.map', {
    url: "/map",
    views: {
      'menuContent': {
        templateUrl: "templates/Menuside/map.html",
        controller:'MadaMapCtrl'
      }
    }
  })

  .state('app.avantvoyage', {
    url: "/avantvoyage",
    views: {
      'menuContent': {
        templateUrl: "templates/Menuside/avantvoyage.html"
      }
    }
  })
  .state('app.faq', {
    url: "/faq",
    views: {
      'menuContent': {
        templateUrl: "templates/Menuside/faq.html"
      }
    }
  })
  .state('app.partenaire', {
    url: "/partenaire",
    views: {
      'menuContent': {
        templateUrl: "templates/Menuside/partenaire.html"
      }
    }
  })
  .state('app.parametre', {
    url: "/parametre",
    views: {
      'menuContent': {
        templateUrl: "templates/Menuside/parametre.html"
      }
    }
  })
  .state('app.contact', {
    url: "/contact",
    views: {
      'menuContent': {
        templateUrl: "templates/Menuside/contact.html"
      }
    }
  })
/* end router menu left*/

/* start router menu right*/

/* end router menu right*/    

/* start router lists different types of trips de la home page */

    /* start router lists type volontourisme ecotourisme ville rando plage*/
   .state('app.list', {
    url: "/list/:type",
    views: {
      'menuContent': {
        templateUrl: "templates/Lists/list.html",
        controller: 'ListsCtrl'
      }
    }
  })
   
/* end router lists different types of trips */

/* start router lists details of different types of trips */
  .state('app.detail', {
    url: "/detail/:detailId",
    views: {
      'menuContent': {
        templateUrl: "templates/DetailsListes/detail.html",
        controller: 'DetailsCtrl'
      }
    }
  });
/* end router lists details of different types of trips */ 

// if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/trips');
});
