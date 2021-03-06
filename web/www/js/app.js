// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','ui.router','satellizer'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.run( function($rootScope, $location, $state) {
    // register listener to watch route changes
    $rootScope.$on( "$stateChangeStart", function(event, toState) {
         var token = localStorage.getItem('satellizer_token');
      if (token) {
          if(toState.name == 'auth'){
              event.preventDefault();
              $state.go('app.browse');
          }
      }else{
          if(toState.name != 'auth'){
            event.preventDefault();
            $state.go('auth');
          }
      }
    })
             
})
.config(function($stateProvider, $urlRouterProvider, $authProvider) {

        // Satellizer configuration that specifies which API
        // route the JWT should be retrieved from
        $authProvider.loginUrl = '/api/authenticate';

  $stateProvider
      .state('auth', {
          url: '/auth',
          templateUrl: '../templates/authView.html',
          controller: 'AuthController as auth'
      })
      .state('logout', {
          url: '/logout',
         controller: function($state){
             console.log('log out');
             localStorage.clear();
             $state.go('auth');
         }
      })
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
		controller: 'searchCtrl'
      }
    }
  })
  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.studygroups', {
      url: '/studygroups',
      views: {
        'menuContent': {
          templateUrl: 'templates/studygroups.html',
          controller: 'studygroupsCtrl'
        }
      }
    })
  .state('app.single', {
    url: '/studygroups/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/studygroup.html',
        controller: 'studyGroupCtrl'
      }
    }
  })
    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'studygroupsCtrl'
        }
      }
    })
	.state('app.createGroups', {
      url: '/createGroups',
      views: {
        'menuContent': {
          templateUrl: 'templates/createGroups.html',
		  controller: 'createCtrl'
        }
      }
    })
  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile.html',
		controller: 'profileController'
      }
    }
  });

  $urlRouterProvider.otherwise('/auth');


});

