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
        var distance =[];
        var directionsService = new google.maps.DirectionsService();
        function calcRoute(place1,place2,callback) {
          var start = place1;
          var end = place2;
          var args = {
              origin:start,
              destination:end,
              travelMode: google.maps.TravelMode.DRIVING
          }
          directionsService.route(args, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                //alert(response.routes[0].legs[0].distance.value);
              callback(response.routes[0].legs[0].distance.value);
            } else {
              alert("fail");
            }
          });
        };


        $scope.getRes = function(id) {
          $scope.bookingResultArray = [];
          $scope.bookingReference = {};
          $http.get('/api/carpooler/'+id)
            .success(function(data) {
              data.travelDate = new moment(data.travelDate).format("MMM Do YYYY");
              data.travelTime = new moment(data.travelTime).format("h:mm:ss a");
              $scope.bookingReference = data;
              for(var i = 0;i<$scope.bookings.length;i++) {
               calcRoute($scope.bookings[i].Destination,$scope.bookingReference.Destination,function(dist){
                  distance.push(dist);
                });
              }
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

          for(var i = 0;i<$scope.bookings.length;i++) {
            if(distance[i] < 5000 || $scope.bookings.Destination === $scope.bookingReference.Destination) {
              $scope.bookingResultArray.push($scope.bookings[i]);
            }
          }
          $scope.status2 = true;
        };


  });
