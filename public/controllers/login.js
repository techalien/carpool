  angular.module('carpooler')
    .controller('LoginCtrl', function($scope, $alert, $auth,$location) {
      $scope.login = function() {
        $auth.login({ email: $scope.email, password: $scope.password })
          .then(function() {
            $location.url('/home');
            $alert({
              content: 'You have successfully logged in',
              animation: 'fadeZoomFadeDown',
              type: 'info',
              duration: 3
            });
          })
          .catch(function(response) {
            $alert({
              content: response.data.message,
              animation: 'fadeZoomFadeDown',
              type: 'info',
              duration: 3
            });
          });
      };
      $scope.authenticate = function(provider) {
        $auth.authenticate(provider)
          .then(function() {
            $alert({
              content: 'You have successfully logged in',
              animation: 'fadeZoomFadeDown',
              type: 'info',
              duration: 3
            });
          })
          .catch(function(response) {
            $alert({
              content: response.data ? response.data.message : response,
              animation: 'fadeZoomFadeDown',
              type: 'info',
              duration: 3
            });
          });
      };
    });
