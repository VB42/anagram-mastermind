var isArray = require('lodash.isarray');
var jsonist = require('jsonist');

var ENDPOINT = 'http://www.anagramica.com/';

function best(letters, callback) {
  if (isArray(letters)) {
    letters = letters.join('');
  }
  jsonist.get(ENDPOINT + 'best/' + letters, callback);
}

function all(letters, callback) {
  if (isArray(letters)) {
    letters = letters.join('');
  }
  jsonist.get(ENDPOINT + 'all/' + letters, callback);
}

function lookup(word, callback) {
  jsonist.get(ENDPOINT + 'lookup/' + word, callback);
}

var anagramica = {};
anagramica.best = best;
anagramica.all = all;
anagramica.lookup = lookup;

module.exports = anagramica;
