var cp = require('child-process');
var streamify = require('./streamify');
var dnode = require('dnode');
var duplexer = require('duplexer');
var through = require('through');

module.exports = function(requireFn, path, cb) {
    if (!cb) {
        cb = path
        path = requireFn;
        requireFn = null;
    }
    if (requireFn && requireFn.resolve)
        path = requireFn.resolve(path);

    
    var child = cp.fork('./worker.js');
    if (typeof(path) == 'function') 
        child.send({cmd: 'load', fn: path.toString()});
    else 
        child.send({cmd: 'load', path: path});
    

    var d = dnode();
    var s = streamify(child);

    s.pipe(d).pipe(s);

    d.on('remote', function(remote) {
        cb(null, remote);
    });
}
