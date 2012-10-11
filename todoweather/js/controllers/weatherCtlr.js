'use strict';

todoWeather.controller('WeatherCtrl', function($scope, $location, $http, weatherStorage){
  var weather = $scope.weather = weatherStorage.get(),
      appID = '5YPE0M64',
      $tempBar = $(".temp-color"),
      time = new Date().getHours(),
      manualLocation = "";

  $scope.timeOfDay = (time >= 18 || time < 6) ? "night" : "day";
  $scope.manualLocation = "";
  $scope.manual = false;
  $scope.tempUnit = 'f';
  $scope.showSettings = "";

  $scope.$watch('weather', function() {
    weatherStorage.put(weather);
  }, true);


  $scope.geolocateSuccess = function(position) {
    weather.geoCords = position.coords.latitude + ','+ position.coords.longitude;
    $scope.findWeather(weather.geoCords);
  };

  $scope.findWeather = function(position) {

    weatherStorage.put('');

    if(!position) {
      position = $scope.manualLocation;
      weather.geoCords = position;
    }

    var geolocateBaseURL = 'http://where.yahooapis.com/geocode?location=' + position +'&flags=J&gflags=R&appid='+appID;
    $.getJSON(geolocateBaseURL).success(function(data){

        var woeid = data.ResultSet.Results[0].woeid,
            wsql = 'select * from weather.forecast where woeid=WID and u="'+ $scope.tempUnit +'"',
            weatherYQL = 'http://query.yahooapis.com/v1/public/yql?&callback=JSON_CALLBACK&q='+encodeURIComponent(wsql)+'&format=json';


         $http.jsonp(weatherYQL.replace('WID',woeid)).success(function(r){
            var fullResults = r.query.results.channel.item;

            weather.currentConditions = {
              'text' : (fullResults.condition.text).toLowerCase(),
              'temp': fullResults.condition.temp,
              'code' : fullResults.condition.code,
              'location': data.ResultSet.Results[0].city + ", " + data.ResultSet.Results[0].statecode
            };

            $scope.calculateTempPercentage(weather);
            weather.loaded = true;
            $scope.showSettings = false;
            $scope.manual = false;
            weather.time = time;
            weatherStorage.put(weather);

        });
    });
  }

  $scope.geolocateError = function(msg) {
    weather.loaded = false;
    $scope.manual = true;
    setTimeout(function() {
      $scope.$apply();
    }, 800)
  };

  $scope.geolocate = function() {

    // If there is weather conditions in local storage we are going to by pass geolocation
    if (weather.currentConditions) {
      // calculate temp-color position
      $scope.calculateTempPercentage(weather);
      // if weather has been fetched within the last hour do nothing, else re-fetch the weather
      if((time - weather.time) <= 1 && (time - weather.time) > 0 ) {
        return
      } else {
        var pos = (weather.geoCords) ? weather.geoCords : weather.currentConditions.location;
        $scope.findWeather(pos)
      }
    }
    // If browser supports geolocation and there is not a current condition in the local storage attempt to geolocate and fetch weather
    else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition($scope.geolocateSuccess, $scope.geolocateError);
    }

    // oops we ran into some sort of error ask for manual location entrance.
    else {

      $scope.geolocateError();
    }
  };

  $scope.calculateTempPercentage = function(weatherObj, unit) {

    var temp = weatherObj.currentConditions.temp;

    if($scope.tempUnit === 'c') {
      temp = (temp * 9)/5 + 32;
    }

    if(temp >= 100) {
      $tempBar.css('background-position-y', '100%')
    } else if (temp <= 0) {
      $tempBar.css('background-position-y', '0%')
    } else {
      $tempBar.css('background-position-y', temp + "%")
    }
  };

  $scope.toggleSettings = function() {
    $scope.showSettings = ($scope.showSettings) ? false : true;
  }
});