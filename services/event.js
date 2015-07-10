angular.module('carpooler')
  .factory('Event', function($resource) {
    return $resource('/api/events/:_id');
  });
