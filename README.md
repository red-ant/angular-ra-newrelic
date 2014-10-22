angular-ra-newrelic.js
======================

`ra.newrelic` module is a wrapper around newrelic-timing. It waits for the 'pageload:ready' event before firing the newRelic 'pageRendered' mark.


### Installing

Install with bower:

```
bower install angular-ra-newrelic
```

### Usage

Include `angular-ra-newrelic.js` and `newrelic-timing.js` files in your javascript.


Include `ra.newrelic` as a dependency of your application.

```javascript
angular.module('application', ['ra.newrelic']);
```