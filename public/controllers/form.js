angular.module('carpooler')
  .controller('AddCtrl', function($scope, $alert, Travel) {
    $scope.message_head = "Start finding your carpoolers!";
    console.log('form');
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
