
var dnode = require('dnode'),
    streamify = require('./streamify');

var s = streamify(process);

process.on('message', function(m) {
    if (m.cmd != 'load') return;
    var api;
    if (m.fn) 
        api = dnode(eval('(' + m.fn + ')();'));
    else 
        api = dnode(require(m.path));
    s.pipe(api).pipe(s);
});
