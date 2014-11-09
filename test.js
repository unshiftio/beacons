/* istanbul ignore next */
describe('beacons', function () {
  'use strict';

  //
  // Polyfill for missing browser global, should be loaded before requiring the
  // modules.
  //
  global.Image = require('./image');

  var assume = require('assume')
    , beacon = require('./');

  it('is exported as function', function () {
    assume(beacon).is.a('function');
  });

  it('returns a constructed Image instance', function () {
    var img = beacon('url', function () {});

    assume(img).is.instanceOf(Image);
    assume(img.src).equals('url');
  });

  it('calls the callback after the specified timeout', function (next) {
    var start = Date.now();

    beacon('url', function (e) {
      var spend = Date.now() - start;

      assume(spend).is.below(110);
      assume(spend).is.above(95);

      assume(e).is.instanceof(Error);
      next();
    }, 100);
  });

  it('it calls the callback when an error load is triggered', function (next) {
    var img = beacon('url', next);
    img.emit('error');
  });

  it('it calls the callback when an load event is triggered', function (next) {
    var img = beacon('url', next);
    img.emit('load');
  });

  it('can be called without a function', function () {
    var img = beacon('url');
    img.emit('load');
  });
});
