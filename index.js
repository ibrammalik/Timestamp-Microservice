// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//
app.get("/api", (req, res) => {
  let date = new Date();
  res.json({ unix: Date.now(), utc: Date() });
});

//
app.get("/api/:date?", function (req, res) {
  let getDate;

  if (req.params.date.match(/\D/)) {
    getDate = new Date(req.params.date);
  } else {
    getDate = new Date(Number(req.params.date));
  };
  if (getDate.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  };
  const UTCDate = getDate.toUTCString();
  const unixTimestamp = getDate.getTime();
  res.send({ unix: unixTimestamp, utc: UTCDate });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
