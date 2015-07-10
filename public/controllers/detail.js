angular.module('carpooler')
  .controller('MainCtrl', function($scope, Travel) {
    $scope.headingTitle = 'Songs in Library';
    $scope.shows = Travel.query();
    $scope.filterBySource = function(genre) {
      $scope.travels = Travel.query({ source: source });
      $scope.headingtitle = source;
    };
    $scope.filterByDestination = function(char) {
      $scope.travels = Travel.query({ destination: destination });
      $scope.headingTitle = destination;
    };
  });
