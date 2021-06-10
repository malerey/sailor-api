var express = require("express");
var app = express();
const fs = require("fs");
const stream = require("stream");

var port = process.env.PORT || 8080;

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

app.get("/", function (req, res) {
  const r = fs.createReadStream(`images/${getRandomInt(71)}.jpg`);
  const ps = new stream.PassThrough();
  stream.pipeline(r, ps, (err) => {
    if (err) {
      console.log(err);
      return res.sendStatus(400);
    }
  });
  ps.pipe(res);
});

const server = app.listen(port, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log("App listening at", host, port);
});
