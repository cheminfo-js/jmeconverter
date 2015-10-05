'use strict';

var nominalMass = require('./nominalMass');

module.exports = molfileToJme;

function molfileToJme(molfile, newLabels) {
    var lines = (molfile + '').split(/\n/);
    var jme = [];
    var atoms = parseInt(lines[3].substr(0, 3));
    var bonds = parseInt(lines[3].substr(3, 3));
    jme.push(atoms);
    jme.push(bonds);
    for (var i = 4; i < (atoms + 4); i++) {

        var line = lines[i];
        var x = parseFloat(line.substr(0, 10)).toFixed(2);
        var y = parseFloat(line.substr(10, 10)).toFixed(2);
        var atom = line.substr(31, 3).trim();
        var massDifference = parseInt(line.substr(34, 2).trim());
        var charge = parseInt(line.substr(36, 3).trim());
        var valence = parseInt(line.substr(48, 3).trim());
        var newAtom;

        if (Array.isArray(newLabels) && newLabels[i - 4]) {
            newAtom = newLabels[i - 4];
        } else {
            newAtom = getJmeAtom(atom, massDifference, charge);
        }

        jme.push(newAtom, x, y);
    }
    for (var i = atoms + 4; i < (atoms + bonds + 4); i++) {
        var line = lines[i];
        var from = parseInt(line.substr(0, 3));
        var to = parseInt(line.substr(3, 3));
        var bond = parseInt(line.substr(6, 3));
        var bondType = parseInt(line.substr(9, 3));
        if (bondType == 1)
            bond = -1;
        if (bondType == 6)
            bond = -2;
        jme.push(from, to, bond);
    }

    return jme.join(' ');
}

// molfile description: http://c4.cabrillo.edu/404/ctfile.pdf
function getJmeAtom(atom, massDifference, charge) {
    var newAtom = '';
    if (massDifference != 0) {
        newAtom += (nominalMass[atom] + massDifference);
    }
    newAtom += atom;
    switch (charge) {
        case 1:
            newAtom += '+3';
            break;
        case 2:
            newAtom += '++';
            break;
        case 3:
            newAtom += '+';
            break;
        case 5:
            newAtom += '-';
            break;
        case 6:
            newAtom += '--';
            break;
        case 7:
            newAtom += '-3';
            break;
    }
    return newAtom;
}
