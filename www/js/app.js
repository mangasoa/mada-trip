// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','starter.controllers','madamap.controllers','firebase','avantvoyage.controllers'])

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
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })
/* start router menu left*/
  .state('app.apropos', {
    url: "/apropos",
    views: {
      'menuContent': {
        templateUrl: "templates/apropos.html"
      }
    }
  })

  .state('app.avantvoyage', {
    url: "/avantvoyage",
    views: {
      'menuContent': {
        templateUrl: "templates/avantvoyage.html"
      }
    }
  })
  .state('app.faq', {
    url: "/faq",
    views: {
      'menuContent': {
        templateUrl: "templates/faq.html"
      }
    }
  })
  .state('app.partenaire', {
    url: "/partenaire",
    views: {
      'menuContent': {
        templateUrl: "templates/partenaire.html"
      }
    }
  })
  .state('app.parametre', {
    url: "/parametre",
    views: {
      'menuContent': {
        templateUrl: "templates/parametre.html"
      }
    }
  })
  .state('app.contact', {
    url: "/contact",
    views: {
      'menuContent': {
        templateUrl: "templates/contact.html"
      }
    }
  })
  .state('app.trips', {
      url: "/trips",
      views: {
        'menuContent': {
          templateUrl: "templates/trips.html",
          controller: 'TripsCtrl'
        }
      }
    })
/* end router menu left*/

/* start router menu right*/
  .state('app.map', {
    url: "/map",
    views: {
      'menuContent': {
        templateUrl: "templates/map.html"
      }
    }
  })
/* end router menu right*/    

/* start router lists different types of trips */

    /* start router lists type volontourisme */
   .state('app.lists', {
    url: "/lists",
    views: {
      'menuContent': {
        templateUrl: "templates/lists.html"
      }
    }
  })
   /* start router lists type ecotourisme */
   .state('app.listseco', {
    url: "/listseco",
    views: {
      'menuContent': {
        templateUrl: "templates/listseco.html"
      }
    }
  })
   /* start router lists type ville */
  .state('app.listsville', {
    url: "/listsville",
    views: {
      'menuContent': {
        templateUrl: "templates/listsville.html"
      }
    }
  })
  /* start router lists type rando */
  .state('app.listsrando', {
    url: "/listsrando",
    views: {
      'menuContent': {
        templateUrl: "templates/listsrando.html"
      }
    }
  })
  /* start router lists type plage */
  .state('app.listsplage', {
    url: "/listsplage",
    views: {
      'menuContent': {
        templateUrl: "templates/listsplage.html"
      }
    }
  })
/* end router lists different types of trips */

/* start router lists details of different types of trips */
  .state('app.lists.details', {
    url: "/lists/:detailsId",
    views: {
      'menuContent': {
        templateUrl: "templates/details.html"
      }
    }
  });
/* end router lists details of different types of trips */ 

// if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/trips');
});
