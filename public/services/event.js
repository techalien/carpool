angular.module('carpooler')
  .factory('Travel', function($resource) {
    return $resource('/api/travels/:_id');
  });
