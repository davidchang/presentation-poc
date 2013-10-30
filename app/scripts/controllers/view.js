'use strict';

angular.module('pocApp')
  .controller('ViewCtrl', function ($scope, $routeParams, firebaseUrl, angularFire) {

    var url = firebaseUrl + '/' + $routeParams.presentationId;
    var ref = new Firebase(url);
    angularFire(ref, $scope, 'presentation');
  });
