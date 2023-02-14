//  Timestamp Microservice
// 
//
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
app.get("/api/:dateString?", function (req, res) {
  let { dateString } = req.params;
  console.log(dateString);
  if (!dateString) {
    return res.json({ unix: new Date().getTime(), utc: new Date().toUTCString() })
  }
  const date = !isNaN(dateString) ?
    new Date(parseInt(dateString)) :
    new Date(dateString);
  if (date.toString() === "Invalid Date" || isNaN(date)) {
    res.json({ error: "invalid date" });
  }
  res.json({ unix: date.getTime(), utc: date.toUTCString() })
})

// listen for requests :)
var listener = app.listen(4000 || process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
