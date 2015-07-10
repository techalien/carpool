angular.module('carpooler')
  .controller('DetailCtrl', function($scope, $rootScope, $routeParams, Travel) {
      Travel.get({ _id: $routeParams.id }, function(travel) {
        $scope.travel = travel;


      });
    });
