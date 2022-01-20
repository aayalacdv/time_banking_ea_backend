import config from 'config'; 
import express from 'express'; 
import cors from 'cors'; 
import log from './logging/logger'; 
import { connect } from './connection/connect';
import { routes } from '../routes/routes';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { deserializeUser } from './middleware/deserializeUser';
import { setUpPassport } from './passport/passport_config';
import { createServer } from "http";

const host = config.get<string>('host');
const port = config.get<number>('port'); 


const app = express(); 
setUpPassport();

app.use(cors()); 
app.use(morgan('combined')); 
app.use(cookieParser()); 
app.use(deserializeUser); 
app.use(express.json()); 
app.use(express.urlencoded({extended: false }));
routes(app);

/*app.listen(port, host, () => {

    connect(); 
    routes(app);
    log.info(`Listening at http://${host}:${port}`); 

})*/

const httpServer = createServer(app);
const io = require("socket.io")(httpServer);


io.on("connection", (socket: any) => {

    console.log("Socket ID: "+socket.id);

    socket.on("room", (data: any)=> {
        socket.join(data["room"]);
        console.log("Has entrado en las publicaciones de "+data["room"]);
    });

    socket.on("room msg", (data:any) => {
        console.log(data);
       socket.to(data["room"]).emit("room msg",data);
    });

});

httpServer.listen(port, host, () =>{
    connect();
    log.info(`Listening at http://${host}:${port}`);
});