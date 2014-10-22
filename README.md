angular-ra-newrelic.js
======================

`ra.newrelic` module is a wrapper around [newrelic-timing](https://github.com/uken/newrelic-timing). It waits for the custom [ra.pageload](https://github.com/red-ant/angular-ra-pageload) 'pageload:ready' event before firing the newRelic 'pageRendered' mark.


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
