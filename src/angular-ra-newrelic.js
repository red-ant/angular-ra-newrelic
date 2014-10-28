(function(angular, NewrelicTiming) {
  'use strict';

  if (typeof angular === 'undefined' || angular === null || typeof angular.module !== 'function') {
    return;
  }

  if (NewrelicTiming === 'undefined') {
    throw new Error('NewrelicTiming is not loaded');
  }

  angular.module('ra.newrelic', ['ra.pageload']).
    run(function($rootScope, $location, newrelicTiming) {
      var path;

      function changeStart() {
        var location_path = $location.path();

        if (path && path !== location_path) {
          pageLoad();
        }

        path = location_path;

        newrelicTiming.mark('navStart');
      }

      function changeSuccess() {
        newrelicTiming.mark('domLoaded');
      }

      function pageLoad() {
        newrelicTiming.mark('pageRendered');
        newrelicTiming.sendNRBeacon(path);
        newrelicTiming.marks = {};
      }

      // ngRoute
      $rootScope.$on('$routeChangeStart', changeStart);
      $rootScope.$on('$routeChangeSuccess', changeSuccess);

      // ui-router
      $rootScope.$on('$stateChangeStart', changeStart);
      $rootScope.$on('$stateChangeSuccess', changeSuccess);

      // custom ra.pageload event
      $rootScope.$on('pageload:ready', pageLoad);
    }).

    factory('newrelicTiming', function() {
      return new NewrelicTiming();
    });

})(window.angular, window.NewrelicTiming);
