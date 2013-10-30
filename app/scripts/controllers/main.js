'use strict';

angular.module('pocApp')
  .controller('MainCtrl', function ($scope, firebaseUrl, angularFire) {
    var ref = new Firebase(firebaseUrl);
    angularFire(ref, $scope, 'presentations');
  });
