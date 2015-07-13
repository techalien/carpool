angular.module('carpooler')
   .controller('LogoutCtrl', function($auth, $alert) {
     if (!$auth.isAuthenticated()) {
         return;
     }
     $auth.logout()
       .then(function() {
         $alert({
             title:'Logged Out',
           content: 'You have been logged out',
           animation: 'fadeZoomFadeDown',
           type: 'info',
           show: true,
           duration: 3
         });
       });
   });
