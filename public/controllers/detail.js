angular.module('carpooler')
  .controller('DetailCtrl', function($scope,$http, Travel) {
    $scope.headingTitle = "Fellow Cab Goers";
    $http.get('/api/carpooler')
        .success(function(data) {
            $scope.ex = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
  });
