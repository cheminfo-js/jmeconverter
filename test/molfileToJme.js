'use strict';

var fs = require('fs');
var readFile = function (file) {
    return fs.readFileSync(__dirname + '/mol/' + file, 'utf-8');
};

var molfileToJme = require('..').molfileToJme;

describe('molfileToJme', function () {
    it('Biphenyl', function () {
        var result = molfileToJme(readFile('biphenyl.mol'));
        result.should.match(/12 13 C .* 1 2 1 2 3 2 3 4 1 4 5 2 5 6 1 6 1 2 1 7 1 8 9 1 9 10 2 10 11 1 11 12 2 7 12 1 7 8 2/);
    });
});
