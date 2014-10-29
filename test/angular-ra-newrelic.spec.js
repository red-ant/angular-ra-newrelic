(function() {
  'use strict';

  describe('ra.newrelic', function() {
    var $rootScope,
        $location,
        newrelicTiming,
        spies;

    beforeEach(function() {
      module('ra.newrelic');

      inject(function($injector) {
        $rootScope     = $injector.get('$rootScope');
        $location      = $injector.get('$location');
        newrelicTiming = $injector.get('newrelicTiming');
      });

      spies = {
        newrelicTiming: {
          mark: spyOn(newrelicTiming, 'mark'),
          sendNRBeacon: spyOn(newrelicTiming, 'sendNRBeacon')
        },

        location: {
          path: spyOn($location, 'path').andReturn('path')
        }
      };
    });

    describe('changeStart >', function() {
      it('should call newrelicTiming.mark on $routeChangeStart', function() {
        $rootScope.$broadcast('$routeChangeStart');
        expect(spies.newrelicTiming.mark).toHaveBeenCalledWith('navStart');
      });

      it('should call newrelicTiming.mark on $stateChangeStart', function() {
        $rootScope.$broadcast('$stateChangeStart');
        expect(spies.newrelicTiming.mark).toHaveBeenCalledWith('navStart');
      });
    });

    describe('changeSuccess >', function() {
      it('should newrelicTiming.mark on $routeChangeSuccess', function() {
        $rootScope.$broadcast('$routeChangeSuccess');
        expect(spies.newrelicTiming.mark).toHaveBeenCalledWith('domLoaded');
      });

      it('should newrelicTiming.mark on $stateChangeSuccess', function() {
        $rootScope.$broadcast('$stateChangeSuccess');
        expect(spies.newrelicTiming.mark).toHaveBeenCalledWith('domLoaded');
      });
    });

    describe('pageLoad >', function() {
      beforeEach(function() {
        $rootScope.$broadcast('$routeChangeStart');
      });

      it('should newrelicTiming.mark on pageload:ready', function() {
        $rootScope.$broadcast('pageload:ready');
        expect(spies.newrelicTiming.mark).toHaveBeenCalledWith('pageRendered');
      });

      it('should newrelicTiming.sendNRBeacon on pageload:ready', function() {
        $rootScope.$broadcast('pageload:ready');
        expect(spies.newrelicTiming.sendNRBeacon).toHaveBeenCalledWith('path');
      });

      it('should not call newrelicTiming.mark if path differs', function() {
        spies.newrelicTiming.mark.reset();
        spies.location.path.andReturn('new_path');

        $rootScope.$broadcast('pageload:ready');
        expect(spies.newrelicTiming.mark).not.toHaveBeenCalled();
      });
    });
  });
})();
