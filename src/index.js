var express = require("express");
var path = require("path");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io").listen(server);
var cors = require("cors");

// app.get("/", function(req, res) {
//   res.send("index.html");
// });

app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

app.use(express.static("public"));
//process.env.PORT ||
server.listen(process.env.PORT || 3000, function() {
  console.log("listening on *:" + process.env.PORT || 3000);
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
