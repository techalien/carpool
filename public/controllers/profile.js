angular.module('carpooler')
  .controller('ProfileCtrl', function($scope, $auth, $alert, Account) {

    /**
     * Get user's profile information.
     */
    $scope.getProfile = function() {
      Account.getProfile()
        .success(function(data) {
          $scope.user = data;
        })
        .error(function(error) {
          $alert({
            content: error.message,
            animation: 'fadeZoomFadeDown',
            type: 'info',
            duration: 3
          });
        });
    };


    /**
     * Update user's profile information.
     */
    $scope.updateProfile = function() {
      Account.updateProfile({
        displayName: $scope.user.displayName,
        email: $scope.user.email,
        phoneNum: $scope.user.phoneNum
      }).then(function() {
        $alert({
          content: 'Profile has been updated',
          animation: 'fadeZoomFadeDown',
          type: 'info',
          duration: 3
        });
      });
    };
    /**
        * Link third-party provider.
        */
       $scope.link = function(provider) {
         $auth.link(provider)
           .then(function() {
             $alert({
               content: 'You have successfully linked ' + provider + ' account',
               animation: 'fadeZoomFadeDown',
               type: 'material',
               duration: 3
             });
           })
           .then(function() {
             $scope.getProfile();
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

    $scope.getProfile();

  });
