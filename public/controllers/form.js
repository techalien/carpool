angular.module('carpooler')
.directive('googleplace', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, model) {
            var options = {
                types: [],
                componentRestrictions: {}
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                scope.$apply(function() {
                    model.$setViewValue(element.val());
                });
            });
        }
    };
})
  .controller('AddCtrl', function($scope, $alert, Travel,$filter,$http,$location) {
    $scope.message_head = "Start finding your carpoolers!";
    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
      $scope.dt = null;
    };

    $scope.places = [
      'Shiv Nadar University',
      'IGI Airport Delhi ( International )',
      'IGI Airport Delhi ( Domestic )',
      'New Delhi Railway Station',
      'Hazrat Nizamuddin Railway Station',
      'Noida Sector 18 ( GIP )',
      'Ansal Plaza / MSX Mall',
      'Ghaziabad',
      'Gurgaon',
      'Other'
    ];
    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 2);
    $scope.events =
      [
        {
          date: tomorrow,
          status: 'full'
        },
        {
          date: afterTomorrow,
          status: 'partially'
        }
      ];

    $scope.getDayClass = function(date, mode) {
      if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0,0,0,0);

        for (var i=0;i<$scope.events.length;i++){
          var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

          if (dayToCheck === currentDay) {
            return $scope.events[i].status;
          }
        }
      }

      return '';
    };
    console.log('form');
    $scope.formatDate = function(date){
          var dateOut = new Date(date);
          return dateOut;
    };
    $scope.travelTime = new Date();

    $http.get('/api/me')
      .success(function(data){
        $scope.user = data;

        console.log(data);
      });
      function srcfunc(location) {
        console.log("test" + location.lat());
        $scope.sourceLat = location.lat();
        $scope.sourceLong = location.lng();
      };
    $scope.addTravel = function() {
      var geo = new google.maps.Geocoder;
      geo.geocode({'address':$scope.Source},function(results, status){
        if (status == google.maps.GeocoderStatus.OK) {
        console.log("srclatitude" + results[0].geometry.location.lat());
        console.log("srclongitude" + results[0].geometry.location.lng());
        // Add some code to work with myLatLng
        srcfunc(results[0].geometry.location);
        geo.geocode({'address':$scope.Destination},function(results, status){
          if (status == google.maps.GeocoderStatus.OK) {
          console.log("destlatitude" + results[0].geometry.location.lat());
          console.log("destlongitude" + results[0].geometry.location.lng());
          // Add some code to work with myLatLng
          $scope.destLat = results[0].geometry.location.lat();
          $scope.destLong = results[0].geometry.location.lng();
          console.log("latitit"+$scope.sourceLat);
          tsave();
          } else {
          alert("Geocode was not successful for the following reason: " + status);
          }
        });
        } else {
        alert("Geocode was not successful for the following reason: " + status);
        }
      });

      function tsave() {
        Travel.save({
        Name: $scope.user.displayName,
        userEmail:$scope.user.email,
        phoneNum:$scope.user.phoneNum,
        Source:$scope.Source,
        Destination:$scope.Destination,
        travelDate:$scope.dt,
        travelTime:$scope.travelTime,
        sourceLat:$scope.sourceLat,
        sourceLong:$scope.sourceLong,
        destLat:$scope.destLat,
        destLong:$scope.destLong
        }).$promise
        .then(function() {
          $scope.Name = '';
          $scope.phoneNum = '';
          $scope.userEmail = '';
          $scope.Source='';
          $scope.Destination='';
          $scope.travelDate='';
          $scope.travelTime='';
          $scope.addForm.$setPristine();
          $location.url('/home');
          $alert({
            content: 'travel request has been logged.',
            animation: 'fadeZoomFadeDown',
            type: 'info',
            duration: 3
          });
        })
        .catch(function(response) {
          $scope.Destination = 'fail';
          $scope.addForm.$setPristine();
          $alert({
            content: response.data.message,
            animation: 'fadeZoomFadeDown',
            type: 'info',
            duration: 3
          });

        })
      };
    };
  });
