// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

function converttounix(date) {
  return Math.floor(new Date(date).getTime())// / 1000)
}
function converttodate(unixdate) {
  let aux=unixdate/1000
  return new Date(aux *1000);
}
app.get("/api/:date?", function(req, res) {
  let { date } = req.params;
  let timeInMillisecond;
  let timeInDate;
  if (date.includes('-')) {
    timeInDate = new Date(date).toUTCString()
    let curdate = new Date(date).getTime();
    if (!curdate) {
      return res.json({ error: "Invalid Date" });
    }
    timeInMillisecond = converttounix(date);
  } else {
    timeInMillisecond = parseInt(date)
    timeInDate = converttodate(date).toUTCString()
  }
  res.json({ unix: timeInMillisecond, utc: timeInDate })
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
