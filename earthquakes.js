var request = require('request');
var parseCSV = require('csv').parse;

function earthquakes() {
  this.ttl = 2.5 * 60 * 1000; //every 2.5 mins fetch new data
  this.dataFetchedAt = null; //time of the when data last refreshed
  this.srcURL = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.csv';
  this.dataType = 'csv';
  this.data = null;

  this.fetch(); //run once to initalize dataset

  //Set an interval to re-fetch data every ttl
  var that = this;
  setInterval(function() {
    console.log("Refreshing data set");
    that.fetch();
  }, this.ttl);
}

earthquakes.prototype.fetch = function() {
  var that = this;
  request(this.srcURL,  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      that.dataFetchedAt = new Date();
      that.parse(body);
    }
  });
};

earthquakes.prototype.parse = function(data) {
  var that = this;
  parseCSV(data, {columns: true, delimiter: ',', quote: '"', escape: '"'}, function(err, output) {
    if(err) {
      console.log("ERROR: " + JSON.stringify(err));
    } else {
      console.log("Refreshed dataset");
    }
    that.data = output;
  });
};


module.exports = new earthquakes();
