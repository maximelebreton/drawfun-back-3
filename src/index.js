var express = require("express");
var path = require("path");
var app = require("express")();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var cors = require("cors");

// app.get("/", function(req, res) {
//   res.send("index.html");
// });
// app.get("/:roomid", function(req, res) {
//   //res.send('user' + req.params.id);

// });

io.on("connection", function(socket) {
  const state = {};

  socket.on("joinroom", function({ room }) {
    console.log("connection established");
    console.log("joinroom: " + room);
    state.room = room;
    socket.join(room);
    socket.broadcast.to(state.room).emit("clientconnect", {
      id: socket.id
    });
  });

  let id = socket.id;
  console.log(socket.request.headers.referer, "socket");

  socket.on("connect", function() {
    console.log("CONNECT");
  });
  socket.on("clientEvent", data => {
    console.log("event from: " + id);
    data.id = id;
    socket.broadcast.to(state.room).emit("serverEvent", data);
  });
  socket.on("disconnect", function(reason) {
    console.log("connection closed");
    if (reason === "io server disconnect") {
      // the disconnection was initiated by the server, you need to reconnect manually
      socket.connect();
    } else {
      socket.broadcast.to(state.room).emit("clientdisconnect", {
        id: socket.id
      });
    }
  });
});

app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

app.use(express.static("public"));
//process.env.PORT ||

server.listen(process.env.PORT || 3000, function() {
  console.log("listening on *:" + (process.env.PORT || 3000));
});
