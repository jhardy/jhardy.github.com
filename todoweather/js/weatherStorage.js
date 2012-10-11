'use strict';

todoWeather.factory( 'weatherStorage', function() {
    var STORAGE_ID = 'todoWeather-weather';

  return {
    get: function() {
      return JSON.parse(localStorage.getItem(STORAGE_ID) || '{}');
    },

    put: function( weather ) {
      localStorage.setItem(STORAGE_ID, JSON.stringify(weather));
    }
  };
});