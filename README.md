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

Once the `beacon` specification lands in the browsers we will start supporting
it transparently. See http://w3c.github.io/beacon/ for the current working draft.

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

Last but not least, the suggested code to handle the response on the server
using Node.js

```js
require('http').createServer(function (req, res) {
  res.statusCode = 404;
  if (req.url !== '/poke') return res.end('404');

  //
  // The actual code that handles the beacon, the code above is just routing of
  // the url..
  //
  res.statusCode = 204;                       // This prevents the need to send a body.
  res.setHeader('Cache-Control', 'no-cache'); // Browsers should never cache this.
  res.end(''); 
});
```

## License

MIT
