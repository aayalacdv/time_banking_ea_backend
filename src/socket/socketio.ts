import  express from "express";
import * as socketio from "socket.io";
import * as path from "path";

const app = express();
app.set("port", process.env.PORT || 4000);

let http = require("http").Server(app);

//intansce of
let io = require("socket.io")(http);

//Detect if someone is connected
io.on("connection", function(socket: any) {
  console.log("a user connected");
  socket.on("message", function(message: any) {
    console.log(message);
  });
});
//The port where we are listen to
const server = http.listen(4000, function() {
  console.log("listening on *:3000");
});