'use strict';

angular.module('pocApp')
  .controller('CreateCtrl', function ($scope, $location, firebaseUrl) {

    $scope.desiredURL = '';

    $scope.presentation = {
      metadata: {
        title: '',
        presenter: ''
      },
      content: {
        index: 0,
        data: []
      }
    };

    $scope.saveLine = function() {
      $scope.presentation.content.data.push({
        original: $scope.originalText,
        translated: $scope.translatedText
      });
      $scope.originalText = '';
      $scope.translatedText = '';
    };

    $scope.savePresentation = function() {
      var toSave = {};
      $scope.presentation.metadata.desiredURL = $scope.desiredURL;
      toSave[$scope.desiredURL] = angular.copy($scope.presentation);
      var ref = new Firebase(firebaseUrl);
      ref.update(toSave, function() {
        $location.path('/presenters-control/' + $scope.desiredURL);
        $scope.$apply();
      });
    }

  });
