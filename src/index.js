var express = require("express");
//var path = require("path");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server, { origins: "*:*" });
//var cors = require("cors");

// app.get("/", function(req, res) {
//   res.send("index.html");
// });
//app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});

// app.use(express.static(path.join(__dirname, "public")));

app.use(express.static("public"));

//server.listen(3000, function() {
server.listen(process.env.PORT || 3000, function() {
  console.log("listening on *:" + (process.env.PORT || 3000));
  //console.log("listening on *:" + 3000);
});

io.on("connection", function(socket) {
  socket.on("toggleRmoteMuteAudio", function(data) {
    io.emit("toggleRmoteMuteAudio", data);
  });
  socket.on("connect", function() {
    console.log("connection established");
  });
  socket.on("disconnect", function() {
    console.log("connection closed");
  });
});
