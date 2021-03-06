'use strict';

angular.module('pocApp', ['firebase'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/create', {
        templateUrl: 'views/create.html',
        controller: 'CreateCtrl'
      })
      .when('/view/:presentationId', {
        templateUrl: 'views/view.html',
        controller: 'ViewCtrl'
      })
      .when('/presenters-control/:presentationId', {
        templateUrl: 'views/presenters-control.html',
        controller: 'PresentersControlCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
