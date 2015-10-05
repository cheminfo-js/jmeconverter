'use strict';

var fs = require('fs');
var readFile = function (file) {
    return fs.readFileSync(__dirname + '/mol/' + file, 'utf-8');
};

var jmeToMolfile = require('..').jmeToMolfile;

describe('jmeToMolfile', function () {
    it('Biphenyl', function () {
        var result = jmeToMolfile(readFile('biphenyl.jme')).split('\n');
        result[3].should.equal(' 12 13  0  0  0  0  0  0  0  0999 V2000');
        result.length.should.equal(30);
    });
});
