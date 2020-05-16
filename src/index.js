var express = require("express");
var path = require("path");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var cors = require("cors");

// app.get("/", function(req, res) {
//   res.send("index.html");
// });
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use(express.static("public"));

http.listen(3000, function() {
  //http.listen(process.env.PORT || 3000, function() {
  //  console.log("listening on *:" + (process.env.PORT || 3000));
  console.log("listening on *:" + 3000);
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
