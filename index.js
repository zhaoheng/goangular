/* jshint browser:true */
/* global require, angular */
/* exported goinstant */

/**
 * @fileOverview
 *
 * Contains Angular service and filter registrations
 **/

'use strict';

var connectionFactory = require('./lib/connection_factory');
var goAngularFactory = require('./lib/go_angular_factory');
var syncFactory = require('./lib/sync_factory');
var keyFactory = require('./lib/key_factory');
var keyFilter = require('./lib/key_filter');

/** goangular module registartion */

var goangular = angular.module('goangular', []);

/** Services **/

goangular.provider('$goConnect', connectionFactory);

goangular.factory('$goSync', [
  '$parse',
  '$timeout',
  syncFactory
]);

goangular.factory('$goKey', [
  '$goSync',
  '$goConnect',
  keyFactory
]);

goangular.factory('GoAngular', [
  '$q',
  '$parse',
  'goConnection',
  goAngularFactory
]);
