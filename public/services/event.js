angular.module('carpooler')
  .factory('Travel', function($resource) {
    return $resource('/api/carpooler/:id');
  });
