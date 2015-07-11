angular.module('carpooler')
  .controller('MainCtrl',function($scope,$http, Travel){
    $scope.status1 = true;
    $scope.status2 = false;
    $scope.formData = {};
    $http.get('/api/carpooler')
        .success(function(data) {
            $scope.bookings = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
        $scope.deleteBooking = function(id) {
            $http.delete('/api/carpooler/' + id)
                .success(function(data) {
                    $scope.bookings = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };
        $scope.getRes = function(id) {
          $http.get('/api/carpooler/'+id)
            .success(function(data) {
              $scope.bookingReference = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
            $scope.status2 = true;
        };
    $scope.getUser = function() {
      $scope.username = $scope.formData.name;
      $scope.status1 = false;
      $scope.formData.name = '';
    };
  });
