angular.module('carpooler')
  .controller('MainCtrl',function($scope,$http, Travel,moment,$auth){

    $scope.formData = {};

    /*$scope.getUser = function() {
      $scope.username = $scope.user.displayName;
      $scope.status1 = false;
    };*/
    $scope.userdata= {};
    $scope.status2 = false;
    $scope.status3 = false;
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
            data[i].travelTime = new moment(data[i].travelTime).format("h:mm a");
            if(data[i].Source === 'Indira Gandhi International Airport, New Delhi, Delhi, India'|| data[i].Source === 'I.G.I. Airport, IGI Airport, Indira Gandhi International Airport, New Delhi, Delhi, India' || data[i].Source === 'I.G.I. Airport Metro Station, IGI Airport, Indira Gandhi International Airport, New Delhi, Delhi, India' || data[i].Source === 'Indira Gandhi International Airport, IGI Airport, New Delhi, Delhi, India'|| data[i].Source === 'igi airport, Barakhamba, New Delhi, Delhi, India') {
              data[i].Source = 'IGI Airport, Indira Gandhi International Airport, New Delhi, Delhi, India';
            }
            if(data[i].Destination === 'Indira Gandhi International Airport, New Delhi, Delhi, India'|| data[i].Destination === 'I.G.I. Airport, IGI Airport, Indira Gandhi International Airport, New Delhi, Delhi, India' || data[i].Destination === 'I.G.I. Airport Metro Station, IGI Airport, Indira Gandhi International Airport, New Delhi, Delhi, India' || data[i].Destination === 'Indira Gandhi International Airport, IGI Airport, New Delhi, Delhi, India'|| data[i].Destination === 'igi airport, Barakhamba, New Delhi, Delhi, India') {
              data[i].Destination = 'IGI Airport, Indira Gandhi International Airport, New Delhi, Delhi, India';
            }
            if(data[i].Source === 'Nizamuddin Railway Station, Nizamuddin East, New Delhi, India' || data[i].Source === 'Hazrat Nizamudin, Nizamuddin East, New Delhi, Delhi, India' || data[i].Source === 'Nizamuddin Railway Station, Nizamuddin East, New Delhi, Delhi, India') {
              data[i].Source = 'Hazrat Nizamuddin Railway Station, New Delhi, Delhi, India';
            }
            if(data[i].Destination === 'Nizamuddin Railway Station, Nizamuddin East, New Delhi, India' || data[i].Destination === 'Hazrat Nizamudin, Nizamuddin East, New Delhi, Delhi, India' || data[i].Destination === 'Nizamuddin Railway Station, Nizamuddin East, New Delhi, Delhi, India') {
              data[i].Destination = 'Hazrat Nizamuddin Railway Station, New Delhi, Delhi, India';
            }
            if(data[i].Source === 'NDLS Ajmeri Gate Side, Pedestrian Overpass, Ajmere Gate, New Delhi, Delhi, India') {
              data[i].Source = 'New Delhi Railway Station, Paharganj Road, Ratan Lal Market, New Delhi, Delhi, India';
            }
            if(data[i].Destination === 'NDLS Ajmeri Gate Side, Pedestrian Overpass, Ajmere Gate, New Delhi, Delhi, India') {
              data[i].Destination = 'New Delhi Railway Station, Paharganj Road, Ratan Lal Market, New Delhi, Delhi, India';
            }
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
                    data[i].travelTime = new moment(data[i].travelTime).format("h:mm a");
                    if(data[i].Source === 'Indira Gandhi International Airport, New Delhi, Delhi, India'|| data[i].Source === 'I.G.I. Airport, IGI Airport, Indira Gandhi International Airport, New Delhi, Delhi, India' || data[i].Source === 'I.G.I. Airport Metro Station, IGI Airport, Indira Gandhi International Airport, New Delhi, Delhi, India' || data[i].Source === 'Indira Gandhi International Airport, IGI Airport, New Delhi, Delhi, India'|| data[i].Source === 'igi airport, Barakhamba, New Delhi, Delhi, India') {
                      data[i].Source = 'IGI Airport, Indira Gandhi International Airport, New Delhi, Delhi, India';
                    }
                    if(data[i].Destination === 'Indira Gandhi International Airport, New Delhi, Delhi, India'|| data[i].Destination === 'I.G.I. Airport, IGI Airport, Indira Gandhi International Airport, New Delhi, Delhi, India' || data[i].Destination === 'I.G.I. Airport Metro Station, IGI Airport, Indira Gandhi International Airport, New Delhi, Delhi, India' || data[i].Destination === 'Indira Gandhi International Airport, IGI Airport, New Delhi, Delhi, India'|| data[i].Destination === 'igi airport, Barakhamba, New Delhi, Delhi, India') {
                      data[i].Destination = 'IGI Airport, Indira Gandhi International Airport, New Delhi, Delhi, India';
                    }
                    if(data[i].Source === 'Nizamuddin Railway Station, Nizamuddin East, New Delhi, India' || data[i].Source === 'Hazrat Nizamudin, Nizamuddin East, New Delhi, Delhi, India' || data[i].Source === 'Nizamuddin Railway Station, Nizamuddin East, New Delhi, Delhi, India') {
                      data[i].Source = 'Hazrat Nizamuddin Railway Station, New Delhi, Delhi, India';
                    }
                    if(data[i].Destination === 'Nizamuddin Railway Station, Nizamuddin East, New Delhi, India' || data[i].Destination === 'Hazrat Nizamudin, Nizamuddin East, New Delhi, Delhi, India' || data[i].Destination === 'Nizamuddin Railway Station, Nizamuddin East, New Delhi, Delhi, India') {
                      data[i].Destination = 'Hazrat Nizamuddin Railway Station, New Delhi, Delhi, India';
                    }
                    if(data[i].Source === 'NDLS Ajmeri Gate Side, Pedestrian Overpass, Ajmere Gate, New Delhi, Delhi, India') {
                      data[i].Source = 'New Delhi Railway Station, Paharganj Road, Ratan Lal Market, New Delhi, Delhi, India';
                    }
                    if(data[i].Destination === 'NDLS Ajmeri Gate Side, Pedestrian Overpass, Ajmere Gate, New Delhi, Delhi, India') {
                      data[i].Destination = 'New Delhi Railway Station, Paharganj Road, Ratan Lal Market, New Delhi, Delhi, India';
                    }
                  }
                    $scope.bookings = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };
        $scope.distance =[];
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
              //  console.log(response.routes[0].legs[0].distance.value);
              console.log("stat" + status);
              callback(response);
            }
          });
        };


        $scope.getRes = function(id) {
          $scope.status2=false;
          //$scope.status3 = false;
          $scope.bookingResultArray = [];
          $scope.bookingReference = {};
          $scope.distance = [];
          $http.get('/api/carpooler/'+id)
            .success(function(data) {
              data.travelDate = new moment(data.travelDate).format("MMM Do YYYY");
              data.travelTime = new moment(data.travelTime).format("h:mm a");
              if(data.Source === 'Indira Gandhi International Airport, New Delhi, Delhi, India'|| data.Source === 'I.G.I. Airport, IGI Airport, Indira Gandhi International Airport, New Delhi, Delhi, India' || data.Source === 'I.G.I. Airport Metro Station, IGI Airport, Indira Gandhi International Airport, New Delhi, Delhi, India' || data.Source === 'Indira Gandhi International Airport, IGI Airport, New Delhi, Delhi, India'|| data.Source === 'igi airport, Barakhamba, New Delhi, Delhi, India') {
                data.Source = 'IGI Airport, Indira Gandhi International Airport, New Delhi, Delhi, India';
              }
              if(data.Destination === 'Indira Gandhi International Airport, New Delhi, Delhi, India'|| data.Destination === 'I.G.I. Airport, IGI Airport, Indira Gandhi International Airport, New Delhi, Delhi, India' || data.Destination === 'I.G.I. Airport Metro Station, IGI Airport, Indira Gandhi International Airport, New Delhi, Delhi, India' || data.Destination === 'Indira Gandhi International Airport, IGI Airport, New Delhi, Delhi, India'|| data.Destination === 'igi airport, Barakhamba, New Delhi, Delhi, India') {
                data.Destination = 'IGI Airport, Indira Gandhi International Airport, New Delhi, Delhi, India';
              }
              if(data.Source === 'Nizamuddin Railway Station, Nizamuddin East, New Delhi, India' || data.Source === 'Hazrat Nizamudin, Nizamuddin East, New Delhi, Delhi, India' || data.Source === 'Nizamuddin Railway Station, Nizamuddin East, New Delhi, Delhi, India') {
                data.Source = 'Hazrat Nizamuddin Railway Station, New Delhi, Delhi, India';
              }
              if(data.Destination === 'Nizamuddin Railway Station, Nizamuddin East, New Delhi, India' || data.Destination === 'Hazrat Nizamudin, Nizamuddin East, New Delhi, Delhi, India' || data.Destination === 'Nizamuddin Railway Station, Nizamuddin East, New Delhi, Delhi, India') {
                data.Destination = 'Hazrat Nizamuddin Railway Station, New Delhi, Delhi, India';
              }
              if(data.Source === 'NDLS Ajmeri Gate Side, Pedestrian Overpass, Ajmere Gate, New Delhi, Delhi, India') {
                data.Source = 'New Delhi Railway Station, Paharganj Road, Ratan Lal Market, New Delhi, Delhi, India';
              }
              if(data.Destination === 'NDLS Ajmeri Gate Side, Pedestrian Overpass, Ajmere Gate, New Delhi, Delhi, India') {
                data.Destination = 'New Delhi Railway Station, Paharganj Road, Ratan Lal Market, New Delhi, Delhi, India';
              }
              $scope.bookingReference = data;
              console.log("started");
              $scope.status3=true;
              var ctr = 0;
              for(var i = 0;i<$scope.bookings.length;i++) {
                if($scope.bookings[i].Source === $scope.bookingReference.Source && $scope.bookings[i].travelDate === $scope.bookingReference.travelDate) {
                  ctr = ctr+ 1;
                }
              }
              for(var i = 0;i<$scope.bookings.length;i++) {
                if($scope.bookings[i].Source === $scope.bookingReference.Source && $scope.bookings[i].travelDate === $scope.bookingReference.travelDate) {
               calcRoute($scope.bookings[i].Destination,$scope.bookingReference.Destination,function(dist){
                  $scope.distance.push(dist);
                //  console.log($scope.distance[0].request.destination);
                  console.log("fF");
                  if($scope.distance.length === ctr) {
                    console.log("do something");
                    $scope.doSomething();
                  }
                });
                }
              }
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

        //  $scope.status2 = true;
        };

        $scope.doSomething= function() {
          $scope.bookingResultArray = [];
        for(var i = 0;i<$scope.bookings.length;i++) {
          if($scope.bookings[i].Source === $scope.bookingReference.Source && $scope.bookings[i].travelDate === $scope.bookingReference.travelDate) {
            for(var j = 0;j<$scope.distance.length;j++) {
              console.log($scope.distance[j].routes[0].legs[0].distance.value);
              if(($scope.distance[j].request.origin === $scope.bookings[i].Destination)&&($scope.distance[j].request.destination === $scope.bookingReference.Destination)) {
                if($scope.distance[j].routes[0].legs[0].distance.value <= 5000){
                  $scope.bookingResultArray.push($scope.bookings[i]);
                  break;
                }
              }
            }
          }
        }
        console.log($scope.distance);
        //console.log($scope.bookings);
        console.log($scope.bookingResultArray);
        console.log("success");
        //console.log($scope.distance.length);
        //console.log($scope.status2);
        $scope.$apply(function(){
          $scope.status2 = true;
        });
      };


  });
