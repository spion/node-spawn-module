
var mspawn = require('../index');

mspawn(require, './fibo.js', function(err, fibo) {
    fibo.async(40, function(err, res) {
        console.log(res);
        mspawn.kill(fibo);
    });
    console.log("did not block");
});

