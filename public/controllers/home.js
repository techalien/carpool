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

              $scope.bookingReference = data;
              console.log("started");
              $scope.status3=true;
              $scope.doSomething();

            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

        //  $scope.status2 = true;
        };
        function toRad (number) {
          return number * Math.PI / 180;
        };

        function distanceh(lat1,lon1,lat2,lon2) {
          var R = 6371000; // metres
          var φ1 = toRad(lat1);
          var φ2 = toRad(lat2);
          var Δφ = toRad(lat2-lat1);
          var Δλ = toRad(lon2-lon1);
          var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
          var d = R * c
          console.log($scope.bookingReference);
          console.log(d);
          return d;
        }

        $scope.doSomething= function() {
          $scope.bookingResultArray = [];
          for(var i = 0;i<$scope.bookings.length;i++) {
            var slt1 = $scope.bookingReference.sourceLat;
            var slt2 = $scope.bookings[i].sourceLat;
            var sln1 = $scope.bookingReference.sourceLong;
            var sln2 = $scope.bookings[i].sourceLong;
            var dlt1 = $scope.bookingReference.destLat;
            var dlt2 = $scope.bookings[i].destLat;
            var dln1 = $scope.bookingReference.destLong;
            var dln2 = $scope.bookings[i].destLong;
            if(distanceh(slt1,sln1,slt2,sln2)<5000) {
              if(distanceh(dlt1,dln1,dlt2,dln2)<5000) {
                $scope.bookingResultArray.push($scope.bookings[i]);
              }
            }
          }
        //console.log($scope.bookings);
        //console.log($scope.bookingResultArray);
        //console.log("success");
        //console.log($scope.distance.length);
        //console.log($scope.status2);
          $scope.status2 = true;

      };


  });
