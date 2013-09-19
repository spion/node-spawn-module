# node-spawn-module

Spawn a node module that exports callback-based functions as a process.

## usage

First, write the module that implements a possibly cpu-intensive function.
Make sure to export a callback-based variant of the function.


```js
// fibo.js
function fibo(n) {
    if (n <= 1) return 1;
    return fibo(n - 1) + fibo(n - 2);
}
exports.async = function fibo_cb(n, cb) {
    return cb(null, fibo(n));
}
```

Then spawn the module

```js
var mspawn = require('spawn-module');

mspawn(require, './fibo.js', function(err, fibo) {
    fibo.async(40, function(err, res) {
        console.log(res);
        mspawn.kill(fibo);
    });
    console.log("did not block");
});
```

Output:

    did not block
    165580141 


## license

MIT
