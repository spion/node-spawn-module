var dnode = require('dnode'),
    streamify = require('./streamify');

process.on('message', function(m) {
    if (m.cmd != 'load') return;
    var s = streamify(process);
    var api = dnode(require(m.path));
    s.pipe(api).pipe(s);
});
