angular.module('carpooler')
  .controller('MainCtrl',function($scope,$http, Travel,moment,$auth,googleDirections){

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
        var directionsService = new google.maps.DirectionsService();
        function calcRoute(ref1,ref2) {
          var start = String(ref1);
          var end = String(ref2);
          var args = {
              origin:start,
              destination:end,
              travelMode: google.maps.TravelMode.DRIVING
          }
           distance = directionsService.route(args, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
              return response.routes[0].legs[0].distance.value;
            } else {
              alert("fail");
            }
          });

          return distance;
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

                          for(i = 0;i<$scope.bookings.length;i++) {
                            alert($scope.bookings[i].Destination,$scope.bookingReference.Destination);
                            dd = calcRoute($scope.bookings[i].Destination,$scope.bookingReference.Destination);
                          if( dd < 5000) {// 5 KM
                            $scope.bookingResultArray.push($scope.bookings[i]);
                          }
                        }


          $scope.status2 = true;
        };


  });
