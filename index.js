'use strict';

var one = require('one-time');

/**
 * Send a small beacon request.
 *
 * @param {String} url The URL we want to reach.
 * @param {Function} fn Optional completion callback.
 * @param {Number} timeout Optional timeout before callback is invoked.
 * @api public
 */
module.exports = function beacon(url, fn, timeout) {
  var img = new Image()
    , time;

  fn = one(fn || function nope() {});

  img.onload = img.onerror = function cleanup() {
    img.onload = img.onerror = null;
    clearTimeout(time);

    fn();
  };

  img.src = url;
  time = setTimeout(function timeout() {
    fn(new Error('Beacon request timed out'));
  }, timeout || 1000);
};
