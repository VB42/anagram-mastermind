# anagramica

[![Build Status](https://travis-ci.org/KenanY/anagramica.svg)](https://travis-ci.org/KenanY/anagramica)
[![Dependency Status](https://gemnasium.com/KenanY/anagramica.svg)](https://gemnasium.com/KenanY/anagramica)

[Anagramica](http://anagramica.com/) API wrapper.

## Example

``` javascript
var anagramica = require('anagramica');

anagramica.all('bread', function(error, response) {
  if (error) {
    throw error;
  }

  console.log(response);
  //=> {
  //=>   'all': [
  //=>     'bared',
  //=>     'beard',
  //=>     'bread',
  //=>     'debar'
  //=>   ]
  //=> }
});
```

## Installation

``` bash
$ npm install anagramica
```

## API

``` javascript
var anagramica = require('anagramica');
```

### `anagramica.best(letters, callback)`

Given an _Array_ or _String_ of `letters`, queries Anagramica for the best case
anagram. Calls `callback(error, response)`.

### `anagramica.all(letters, callback)`

Given an _Array_ or _String_ of `letters`, queries Anagramica for every possible
anagram. Calls `callback(error, response)`.

### `anagramica.lookup(word, callback)`

Queries Anagramica on whether or not _String_ `word` is in the Anagramica
dictionary. Calls `callback(error, response)`.