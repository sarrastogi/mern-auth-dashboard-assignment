
import express from "express";
import ConnectDb from "./Database/index.js";
import router from "./routes/auth.js";
import winston from "winston";
import morgan from "morgan";
import logger from "./logger.js";

const app = express();
let port = 5000;
const morganFormat = ":method :url :status :response-time ms";
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);


app.use(express.json())
app.use('/api/users',router)

ConnectDb()
  .then(() => {
    app.listen(port, () => {
      console.log("connection success");

      console.log(`server is listen on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("connection fail");
  });
