import config from "config";
import express from "express";
import cors from "cors";
import log from "./logging/logger";
import { connect } from "./connection/connect";
import { routes } from "../routes/routes";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { deserializeUser } from "./middleware/deserializeUser";

const host = config.get<string>("host");
const port = config.get<number>("port");




const app = express();

app.use(cors({
    origin: '*',
    credentials : true,
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    res.header("Access-Control-Expose-Headers", "*");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});


app.use(express.static('uploads')); 
app.use(morgan("combined"));
app.use(cookieParser());
app.use(deserializeUser);
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.listen(port, host, () => {
  connect();
  routes(app);
  log.info(`Listening at http://${host}:${port}`);
});
