import  express from "express";
import  socketio from "socket.io";
import  path from "path";
import {UserC} from '../models/userc.model'


const app = express();
app.set("port", process.env.PORT || 4008);

let http = require("http").Server(app);

//instansce of socket
let io = require("socket.io")(http);

var usersC: Array<UserC> =[];

//We register a middleware which checks the username and allows the connection
io.use((socket: any, next:any) => {
  const username = socket.handshake.auth.username;
  console.log("Username "+ username)
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
});

//Detect if someone is connected and gets the socket(client connected)
io.on("connection", function(socket: any) {
  
  usersC.push(new UserC(socket.id,socket.username));
  
  for (let index = 0; index < usersC.length; index++) {
    console.log(usersC[index]);
  }   
  //Emit to me all the users connected after I connnect (including me)
  // socket.emit("usersC", usersC );

  //Emit (broadcast) to others clients less me, that I am connect
  // socket.broadcast.emit("user connected",{
  //   userId:socket.id,
  //   username: socket.username,
  //   connected: true
  // });

  //Emit to all the sockets connected
  io.emit("user connected", usersC);
 
  socket.join(socket.username);

  socket.on("msg",(data:any) =>{
    console.log("Sender:" + data["sender"]);
    console.log("Receiver:" + data["receiver"]);
    console.log("Msg:" + data["message"]);

    socket.to(data["receiver"]).emit("msg",data);
  });

  socket.on('bye', function(){

    for (let index = 0; index < usersC.length; index++) {
      if(usersC[index].userId == socket.id){
        usersC[index].connected = false;
      }
    } 
    io.emit("user disconnected", usersC);
    
    console.log("socket que dice bye " + socket.username);
    socket.disconnect(true);
  });
  
  socket.on('disconnect', function () {
    //let's filter the userC pulling the socket disconnected
    //usersC = usersC.filter(u => u.userId !== socket.id);
    console.log('socket disconnected : ' + socket.username);
    
  });
});

//The port where we are listen to
const server = http.listen(4008,'localhost', function() {
  console.log("listening on Port 4008");
  console.log(http.address());
});
