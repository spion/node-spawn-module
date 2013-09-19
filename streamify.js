var through = require('through');
var duplexer = require('duplexer');

module.exports = function streamify(proc) {
    var sread = through();
    proc.on('message', function(data) {
        if (data.cmd == 'stream')
            sread.push(data.data); 
    });
    proc.on('disconnect', function(data) {
        sread.push(null);
    });

    var swrite = through(function(data) {
        proc.send({cmd: 'stream', data: data});
    })

    return duplexer(swrite, sread);
}

