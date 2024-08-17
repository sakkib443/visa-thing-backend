import cors from "cors";
import express, { Application, Request, Response } from "express";

import router from "./app/routes";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api", router);

const apiCheck = async (req:Request,res:Response)=>{
  const message = "Visathing backend server api running";
  res.send(message)
}

app.get("/", apiCheck);

//Global Error Handler
// app.use(globalErrorHandler);

//Not Found
// app.use(notFound);

export default app;
