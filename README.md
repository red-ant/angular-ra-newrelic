angular-ra-newrelic.js
======================

The `ra.newrelic` module is a wrapper around [newrelic-timing](https://github.com/uken/newrelic-timing). It waits for the custom [ra.pageload](https://github.com/red-ant/angular-ra-pageload) 'pageload:ready' event before firing the newRelic 'pageRendered' mark to give a better representation of page load times.


### Installing

Install with bower:

```
bower install angular-ra-newrelic --save
```

### Usage

Include the following js files:

```
bower_components/newrelic-timing/newrelic-timing.js
bower_components/angular-ra-pageload/angular-ra-pageload.js
bower_components/angular-ra-newrelic/angular-ra-newrelic.js
```

Add `ra.newrelic` dependency to your application.

```javascript
angular.module('application', ['ra.newrelic']);
```
