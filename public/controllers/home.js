angular.module('carpooler')
  .controller('MainCtrl',function($scope,$http, Travel){
    $scope.status = true;
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
    $scope.getUser = function() {
      $scope.username = $scope.formData.name;
      $scope.status = false;
      $scope.formData.name = '';
    }
  })
