angular.module('carpooler')
  .controller('NavbarCtrl', function($scope, Auth) {
    $scope.logout = function() {
      Auth.logout();
    };
  });
