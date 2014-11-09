'use strict';

var EventEmitter = require('events').EventEmitter
  , util = require('util');

/**
 * Image instance.
 *
 * @constructor
 * @param {String} url URL we want to connect to
 * @api private
 */
/* istanbul ignore next */
function Image() {
  if (!this) return new Image();

  this.url = null;

  EventEmitter.call(this);

  setTimeout(function timeout() {
    if (this.onerror) this.on('error', this.onerror);
    if (this.onload) this.on('load', this.onload);
  }.bind(this));
}

util.inherits(Image, EventEmitter);

Object.defineProperty(Image.prototype, 'src', {
  set: function set(url) {
    this.url = url;
  },
  get: function get() {
    return this.url;
  }
});

//
// Assign Event Listeners.
//
['error', 'load'].forEach(function each(type) {
  Object.defineProperty(Image.prototype, 'on'+ type, {
    set: function set(fn) {
      if ('function' === typeof fn) this.on(type, fn);
    }
  });
});

//
// Expose module.
//
module.exports = Image;
