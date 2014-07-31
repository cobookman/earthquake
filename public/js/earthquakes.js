//app code
function App(earthquakes) {
  this.earthquakes = earthquakes;
  this.yesRange = 125; //yes if earthquake w/in this.yesRange km.
  this.msgDiv = document.getElementById('msg');
  this.location();
}

App.prototype.location = function(callback) {
  var that = this;

  if(!navigator.geolocation) {
    callback({ error: "<h2>Could not get your geo location. \n Please use a more modern web-browser.</h2>"});
  } else {
    navigator.geolocation.getCurrentPosition(
      function onSuccess(position) {
        that.seeIfEarthquake.call(that, position);
      },
      function onFailure() {
        that.locationFail.call(that);
      }
    );
    this.msgDiv.innerHTML = "<h2>Finding location...</h2><br><img src='/ico/loading1.gif'></img>";
  }
};

App.prototype.seeIfEarthquake = function(position) {
  if(position.hasOwnProperty('error')) {
    this.msgDiv.innerHTML = '<h2>position.error</h2>';
    return;
  } else {
    this.msgDiv.innerHTML = '<h1>Comparing your Geo Location to most recent earthquakes</h1>';
  }
  var isEarthquakeNear = false;
  var earthquakesNearMsg = [];
  for(var i = 0, l = this.earthquakes.length; i < l; ++i) {
    var distance = getDistanceFromLatLonInKm(earthquakes[i].latitude, earthquakes[i].longitude, position.coords.latitude, position.coords.longitude);
    console.log(distance);
    if(Math.abs(distance) < this.yesRange) {
      isEarthquakeNear = true;
      earthquakesNearMsg.push(this.earthquakes[i].place);
      break;
    }
  }

  if(isEarthquakeNear) {
    var html = '<div class="xxxxl-text">Yes, at: </div>';
    html += '<div class="xxl-text">' + earthquakesNearMsg.join('<br>') + '</div>';
    document.getElementById('msg').innerHTML = html;
  } else {
    document.getElementById('msg').innerHTML = '<span class="xxxxl-text">no</span>';
  }

};

App.prototype.locationFail = function() {
  console.log("FAIL");
  this.msgDiv.innerHTML = "<h3>Could not get your geo location :(</h3>";
};

/* http://stackoverflow.com/questions/27928/how-do-i-calculate-distance-between-two-latitude-longitude-points */
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180);
}