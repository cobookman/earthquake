
/*
 * IS there an earthquake?!?!?
 *    I do realize there's a race condition that if a user accesses the webpage 
 *    before i fetch data for the first time, they will have problems
 *    but that is a super duper rare event...and this was a 'hackathon' like
 *    project....so yeah.
 */

var earthquakes = require('../earthquakes');
exports.index = function(req, res) {
  /* Handling of really rare race condition that should 'nvr' occur.... */
  if(!earthquakes.data) {
    res.send("ERROR, no earthquake data.  Please refresh the page.");
    return;
  }
  res.render('index', function(err, html) {
    html += '<script>var earthquakes = ' + JSON.stringify(earthquakes.data) + ';</script>\n';
    html += '<script src="/js/earthquakes.js"></script>\n<script>var app = new App(earthquakes);</script>\n';
    res.send(html + '  </body>\n</html>');
  });

};
