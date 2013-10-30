'use strict';

angular.module('pocApp')
  .controller('PresentersControlCtrl', function ($scope, $routeParams, firebaseUrl, angularFire) {
    var url = firebaseUrl + '/' + $routeParams.presentationId;
    var ref = new Firebase(url);
    angularFire(ref, $scope, 'presentation');

    $scope.incrementPosition = function() {
      if ($scope.presentation.content.index < $scope.presentation.content.data.length)
        $scope.presentation.content.index++;
    };

    $scope.resetPosition = function() {
      $scope.presentation.content.index = 0;
    }
  });
