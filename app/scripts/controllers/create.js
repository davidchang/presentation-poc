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
        presentationIndex: 0,
        data: []
      }
    };

    $scope.presentation = {
      metadata: {
        title: 'title',
        presenter: 'presenter'
      },
      content: {
        index: 0,
        data: [
          {original: 1, translated: 2},
          {original: 3, translated: 4},
          {original: 5, translated: 6}
        ]
      }
    };

    $scope.saveLine = function() {
      $scope.presentation.content.push({
        original: $scope.originalText,
        translated: $scope.translatedText
      });
      $scope.originalText = '';
      $scope.translatedText = '';
    };

    $scope.savePresentation = function() {
      var toSave = {};
      toSave[$scope.desiredURL] = angular.copy($scope.presentation);
      var ref = new Firebase(firebaseUrl);
      ref.update(toSave, function() {
        $location.path('/view/' + $scope.desiredURL);
        $scope.$apply();
      });
    }

  });
