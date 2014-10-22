(function() {
  'use strict';

  describe('ra.newrelic', function() {
    var $rootScope,
        $location,
        newrelicTiming;

    beforeEach(function() {
      module('ra.newrelic');

      inject(function($injector) {
        $rootScope     = $injector.get('$rootScope');
        $location      = $injector.get('$location');
        newrelicTiming = $injector.get('newrelicTiming');
      });

      spyOn(newrelicTiming, 'mark');
      spyOn(newrelicTiming, 'sendNRBeacon');
      spyOn($location, 'path').andReturn('path');
    });

    describe('changeStart >', function() {
      it('should call newrelicTiming.mark on $routeChangeStart', function() {
        $rootScope.$broadcast('$routeChangeStart');
        expect(newrelicTiming.mark).toHaveBeenCalledWith('navStart');
      });

      it('should call newrelicTiming.mark on $stateChangeStart', function() {
        $rootScope.$broadcast('$stateChangeStart');
        expect(newrelicTiming.mark).toHaveBeenCalledWith('navStart');
      });
    });

    describe('changeSuccess >', function() {
      it('should newrelicTiming.mark on $routeChangeSuccess', function() {
        $rootScope.$broadcast('$routeChangeSuccess');
        expect(newrelicTiming.mark).toHaveBeenCalledWith('domLoaded');
      });

      it('should newrelicTiming.mark on $stateChangeSuccess', function() {
        $rootScope.$broadcast('$stateChangeSuccess');
        expect(newrelicTiming.mark).toHaveBeenCalledWith('domLoaded');
      });
    });

    describe('pageLoad >', function() {
      it('should newrelicTiming.mark on pageload:ready', function() {
        $rootScope.$broadcast('pageload:ready');
        expect(newrelicTiming.mark).toHaveBeenCalledWith('pageRendered');
      });

      it('should newrelicTiming.sendNRBeacon on pageload:ready', function() {
        $rootScope.$broadcast('pageload:ready');
        expect(newrelicTiming.sendNRBeacon).toHaveBeenCalledWith('path');
      });
    });
  });
})();
