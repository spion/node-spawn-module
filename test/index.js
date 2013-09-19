var t = require('tap');

var spawnm = require('../index');

t.test('basic example', function(t) {
    spawnm(require, './harness/example', function(err, proc) {
        proc.shout('meep', function(err, shouted) {
            t.equals(shouted, 'MEEP');
            spawnm.kill(proc);
            t.end();
        });
    });
});
