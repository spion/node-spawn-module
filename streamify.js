var through = require('through');
var duplexer = require('duplexer');

module.exports = function streamify(proc) {
    var swrite = through();
    proc.on('message', function(data) { 
        if (data.cmd == 'stream')
            swrite.push(data.data); 
    });
    proc.on('disconnect', function(data) {
        swrite.push(null);
    });

    var sread = through(function(data) {
        proc.send({cmd: 'stream', data: data});
    })

    return duplexer(swrite, sread);
}

