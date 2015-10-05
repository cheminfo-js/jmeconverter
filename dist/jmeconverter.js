(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["jmeconverter"] = factory();
	else
		root["jmeconverter"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.molfileToJme = __webpack_require__(1);
	exports.jmeToMolfile = __webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var nominalMass = __webpack_require__(2);

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


/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    Cs: 133,
	    Cu: 64,
	    Kr: 84,
	    Cl: 35,
	    Co: 59,
	    Cr: 52,
	    Li: 7,
	    Cd: 112,
	    Ce: 140,
	    La: 139,
	    Lu: 175,
	    Tm: 169,
	    Ti: 48,
	    Te: 128,
	    Dy: 162,
	    Ta: 181,
	    Mg: 24,
	    Tc: 98,
	    Tb: 159,
	    F: 19,
	    Fe: 56,
	    B: 11,
	    C: 12,
	    N: 14,
	    O: 16,
	    H: 1,
	    Eu: 152,
	    Mo: 96,
	    I: 127,
	    Mn: 55,
	    K: 39,
	    Er: 167,
	    W: 184,
	    V: 51,
	    Ni: 59,
	    P: 31,
	    S: 32,
	    Nd: 144,
	    Ne: 20,
	    Nb: 93,
	    Y: 89,
	    Na: 23,
	    Ge: 73,
	    Gd: 157,
	    Ga: 70,
	    Yb: 173,
	    Pt: 195,
	    Pr: 141,
	    Hf: 178,
	    He: 4,
	    Pd: 106,
	    Ho: 165,
	    Pm: 145,
	    Xe: 131,
	    Os: 190,
	    Se: 79,
	    Au: 197,
	    Sc: 45,
	    In: 115,
	    Ar: 40,
	    Si: 28,
	    As: 75,
	    Sn: 119,
	    Sm: 150,
	    Ba: 137,
	    Sr: 88,
	    Ir: 192,
	    Ru: 101,
	    Ag: 108,
	    Sb: 122,
	    Al: 27,
	    Rb: 85,
	    Re: 186,
	    Rh: 103,
	    Br: 80,
	    Ca: 40,
	    Be: 9,
	    Zn: 65,
	    Zr: 91
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var nominalMass = __webpack_require__(2);

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


/***/ }
/******/ ])
});
;