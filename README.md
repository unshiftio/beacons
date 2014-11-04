# Beacons

Beacons is small library to send beacons to your server. It's basically a really
minimal way of doing one way communication in browsers without any dependency on
XHR requests or what ever. Internally it will use `Image` to do the actual
requesting of the resource. So this method will not work when images are
blocked. But it's still a great way to send additional debugging information to
your server.

When you receive a beacon request on your server make sure you:

- Respond with a status code `204` and don't return any content.
- Don't add pointless HTTP headers to the response. Things such as `Cookie`
  headers are not needed and only add pointless bandwidth to these micro
  requests.

## Installation

This module is only written for browser usage and assumes that a node.js module
system is used for requiring the module. The module it self is released in npm
and can be installed from the CLI using the following command:

```
npm install --save beacons
```

## Usage

The API is as tiny as the module it self. It only exposes one function that does
the request. This function accepts 3 arguments, the last 2 are optional.

1. `url` The URL you want to request.
2. `fn` An optional completion callback, it will be called when the resource is
   loaded, failed to load or times-out. It's not a guarantee that the message is
   actually send as that is nearly impossible to detect.
3. `timeout` The timeout before the callback is called. Defaults to `1000` ms.

So using this module is as simple as:

```js
'use strict';

var beacon = require('beacons');

beacon('http://example.com/poke', function () {
  console.log('poked example.com');
});
```

## License

MIT
