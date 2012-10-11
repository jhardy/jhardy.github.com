'use strict';

todoWeather.factory( 'githubStorage', function() {
    var STORAGE_ID = 'todoWeather-github';

  return {
    get: function() {
      return JSON.parse(localStorage.getItem(STORAGE_ID) || '{}');
    },

    put: function( weather ) {
      localStorage.setItem(STORAGE_ID, JSON.stringify(weather));
    }
  };
});