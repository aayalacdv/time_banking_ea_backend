import { validateUser } from "./../src/middleware/user.validate";
import { Express } from "express";
import {
  googleAuthHandler,
  testingHandler,
  testingHandler2,
} from "../src/controller/user.controller";
import userRouter from "./user.routes";
import servicerouter from "./service.routes";

export function routes(app: Express) {

  app.use("/api/user", userRouter);

  app.use("/api/services", servicerouter);
  //testing purposes
  app.get("/api/testing", testingHandler);
  
}
