'use strict';

todoWeather.factory( 'todoStorage', function() {
  var STORAGE_ID = 'todoWeather-todos';
  var SCOPED_NAME = 'todos'

  return {
    get: function() {
      return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
    },

    put: function( todos ) {
      localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
    }
  };
});