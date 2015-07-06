/*!
 * angular-ra-newrelic.js v0.1.4
 * https://github.com/red-ant/angular-ra-newrelic
 */
(function(angular, NewrelicTiming) {
  'use strict';

  if (typeof angular === 'undefined' || angular === null || typeof angular.module !== 'function') {
    return;
  }

  if (NewrelicTiming === 'undefined') {
    throw new Error('NewrelicTiming is not loaded');
  }

  angular.module('ra.newrelic', ['ra.pageload']).
    run(['$rootScope', '$location', 'newrelicTiming', function($rootScope, $location, newrelicTiming) {
      var path;

      function changeStart() {
        path = $location.path();
        resetMarks();
        newrelicTiming.mark('navStart');
      }

      function changeSuccess() {
        newrelicTiming.mark('domLoaded');
      }

      function pageLoad() {
        if (path === $location.path()) {
          newrelicTiming.mark('pageRendered');
          newrelicTiming.sendNRBeacon(path);
        }

        resetMarks();
      }

      function resetMarks() {
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
    }]).

    factory('newrelicTiming', function() {
      return new NewrelicTiming();
    });

})(window.angular, window.NewrelicTiming);
