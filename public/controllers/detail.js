angular.module('carpooler')
<<<<<<< HEAD
  .controller('DetailCtrl', function($scope, Travel) {
    $scope.headingTitle = 'Fellow Cab Goers';
    $scope.sources=; // get list of sources from Mongoose
    $scope.destinations=;// get list of destinations from Mongoose
    $scope.travels = Travel.query();        //Run a search query within Angular of Source
    $scope.filterBySource = function(sources) {
=======
  .controller('MainCtrl', function($scope, Travel) {
    $scope.headingTitle = 'Tr';
    $scope.shows = Travel.query();
    $scope.filterBySource = function(genre) {
>>>>>>> origin/master
      $scope.travels = Travel.query({ source: source });
      $scope.headingtitle = source;
    };
    $scope.filterByDestination = function(destinations) {       //Run a search query within Angular of Destination
      $scope.travels = Travel.query({ destination: destination });
      $scope.headingTitle = destination;
    };
  });
