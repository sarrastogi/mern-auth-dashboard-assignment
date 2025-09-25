
import express from "express";
import ConnectDb from "./Database/index.js";
import router from "./routes/auth.js";

const app = express();
let port = 5000;

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
