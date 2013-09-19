var cp = require('child_process');
var streamify = require('./streamify');
var dnode = require('dnode');
var duplexer = require('duplexer');
var through = require('through');
var path = require('path');

module.exports = function(requireFn, code, cb) {
    if (!cb) {
        cb = code
        code = requireFn;
        requireFn = null;
    }
    if (requireFn && requireFn.resolve)
        code = requireFn.resolve(code);

    
    var child = cp.fork(path.join(__dirname, 'worker'));

    child.send({cmd: 'load', path: code});

    var d = dnode();
    var s = streamify(child);

    s.pipe(d).pipe(s);

    d.on('remote', function(remote) {
        remote.__child_process__ = child;
        cb(null, remote);
    });
}

module.exports.kill = function(remote) {
    remote.__child_process__.kill();
    remote.__child_process__ = null;
};
