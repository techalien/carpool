angular.module('carpooler')
  .controller('MainCtrl',function($scope,$http, Travel,moment,$auth){

    $scope.formData = {};

    /*$scope.getUser = function() {
      $scope.username = $scope.user.displayName;
      $scope.status1 = false;
    };*/
    $scope.userdata= {};

    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

      $http.get('/api/me')
        .success(function(data){
          $scope.userdata = data;
          $scope.username = data.displayName;
          $scope.useremail = data.email;
          console.log(data);
        });

    $http.get('/api/carpooler')
        .success(function(data) {
          for(i = 0;i<data.length;i++) {
            data[i].travelDate = new moment(data[i].travelDate).format("MMM Do YYYY");
            data[i].travelTime = new moment(data[i].travelTime).format("h:mm:ss a");
          }
            $scope.bookings = data;
            //console.log(data);
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


  });
