angular.module('carpooler')
  .controller('LandCtrl',function($scope,$http,$location,$auth){
    $scope.changeView = function(view) {
      $location.url('/' + view);
    };

    $scope.init = function() {
      if($auth.isAuthenticated() === true) {
          $location.url('/home');
        };

    };
});
