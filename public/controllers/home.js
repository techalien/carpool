angular.module('carpooler')
  .controller('MainCtrl',function($scope,$http, Travel,moment){
    $scope.status1 = true;
    $scope.status2 = false;
    $scope.formData = {};
    $http.get('/api/carpooler')
        .success(function(data) {
          for(i = 0;i<data.length;i++) {
            data[i].travelDate = new moment(data[i].travelDate).format("MMM Do YYYY");
            data[i].travelTime = new moment(data[i].travelTime).format("h:mm:ss a");
          }
            $scope.bookings = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
        $scope.deleteBooking = function(id) {
            $http.delete('/api/carpooler/' + id)
                .success(function(data) {
                  for(i = 0;i<data.length;i++) {
                    data[i].travelDate = new moment(data[i].travelDate).format("MMM Do YYYY");
                    data[i].travelTime = new moment(data[i].travelTime).format("h:mm:ss a");
                  }
                    $scope.bookings = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };
        $scope.getRes = function(id) {
          $scope.bookingReference = {};
          $http.get('/api/carpooler/'+id)
            .success(function(data) {
              data.travelDate = new moment(data.travelDate).format("MMM Do YYYY");
              data.travelTime = new moment(data.travelTime).format("h:mm:ss a");
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
