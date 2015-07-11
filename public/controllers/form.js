angular.module('carpooler')
  .controller('AddCtrl', function($scope, $alert, Travel) {
    $scope.message_head = "Start finding your carpoolers!";
    console.log('form');
    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
      $scope.dt = null;
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
    $scope.addTravel = function() {
      Travel.save({
        Name: $scope.Name,
        userEmail:$scope.userEmail,
        phoneNum:$scope.phoneNum,
        Source:$scope.Source,
        Destination:$scope.Destination,
        travelDate:$scope.travelDate,
        travelTime:$scope.travelTime
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
          $alert({
            content: 'travel request has been logged.',
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        })
        .catch(function(response) {
          $scope.Destination = 'fail';
          $scope.addForm.$setPristine();
          $alert({
            content: response.data.message,
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        });
    };
  });
