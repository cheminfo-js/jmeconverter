'use strict';

var nominalMass = require('./nominalMass');

module.exports = jmeToMolfile;

function jmeToMolfile(jme) {
    var molfile = [];
    molfile.push('line 1');
    molfile.push('');
    molfile.push('line 3');

    var molecules = jme.split('|');
    var atomsNb = 0;
    var bondsNb = 0;
    var allFields = [];
    for (var i = 0; i < molecules.length; i++) {
        var molecule = molecules[i];
        var fields = molecule.split(/[ \r\n\t]+/);
        if (fields.length < 2)
            return;
        atomsNb += parseInt(fields[0]);
        bondsNb += parseInt(fields[1]);
        allFields.push(fields);
    }

    atomsNb += '';
    bondsNb += '';

    molfile.push('   '.substring(0, 3 - atomsNb.length) + atomsNb + '   '.substring(0, 3 - bondsNb.length) + bondsNb + '  0  0  0  0  0  0  0  0999 V2000');

    var currentShift = 0;
    var atoms = [];
    var bonds = [];
    for (var i = 0; i < molecules.length; i++) {
        var fields = allFields[i];
        var atomsNb = parseInt(fields[0]);
        var bondsNb = parseInt(fields[1]);
        var position = 2;
        while (atomsNb > 0) {
            atomsNb--;
            var atom = fields[position++];
            var x = fields[position++];
            var y = fields[position++];
            atoms.push(jmeToAtom(atom, x, y));
        }
        while (bondsNb > 0) {
            bondsNb--;
            var from = fields[position++] * 1;
            var to = fields[position++] * 1;
            var type = fields[position++];
            bonds.push(jmeToBond(from + currentShift, to + currentShift, type));
        }
        currentShift += parseInt(fields[0]);
    }
    molfile = molfile.concat(atoms);
    molfile = molfile.concat(bonds);
    molfile.push('M  END');
    return molfile.join('\n');
}

function numberToString10(number) {
    var oneNumber = number + '';
    var posPoint = oneNumber.indexOf('.');
    var numberSpace = 5 - posPoint;
    var number0 = 5 - (oneNumber.length - posPoint);
    var result = '     '.substring(0, numberSpace) + oneNumber + '0000'.substring(0, number0);
    return result;
}

function jmeToAtom(atom, x, y) {
    var line = '';
    line += numberToString10(x);
    line += numberToString10(y);
    line += '    0.0000 ';
    line += jmeAtomToMolfileLine(atom);
    return line;
}

function jmeAtomToMolfileLine(fullAtom) {
    var result = '';
    var isotope = fullAtom.replace(/^([0-9]*)([^-+]+)(.*)/, '$1');
    var atom = fullAtom.replace(/^([0-9]*)([^-+]+)(.*)/, '$2');
    var charge = fullAtom.replace(/^([0-9]*)([^-+]+)(.*)/, '$3');
    result += atom + '   '.substring(atom.length, 3);
    if (isotope) {
        var mass = (isotope * 1 - (nominalMass[atom])) + '';
        result += '  '.substring(mass.length, 2) + mass; // mass difference
    } else {
        result += ' 0';
    }
    if (charge) {
        if (charge.match(/^\+*$/)) {
            charge = charge.length;
        } else if (charge.match(/^\-*$/)) {
            charge = -charge.length;
        } else
            charge = parseInt(charge);
        switch (charge) {
            case 1:
                result += '  3';
                break;
            case 2:
                result += '  2';
                break;
            case 3:
                result += '  1';
                break;
            case -1:
                result += '  5';
                break;
            case -2:
                result += '  6';
                break;
            case -3:
                result += '  7';
                break;
        }

    } else {
        result += '  0';
    }
    result += '  0  0  0  0  0  0  0  0  0  0';
    return result;
}

function jmeToBond(from, to, type) {
    from += '';
    to += '';
    type = parseInt(type);
    var line = '   '.substring(from.length, 3) + from + '   '.substring(to.length, 3) + to;
    switch (type) {
        case -1:
            line += '  1  1';
            break;
        case -2:
            line += '  1  6';
            break;
        default:
            line += '  ' + type + '  0';
    }
    return line;
}
