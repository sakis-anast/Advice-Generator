const express = require("express");
// const mongoose = require('mongoose')
const app = express();
const port = 3636;

const userRoute = require("./routes/userRoute");
const adviceRoute = require("./routes/adviceRoute");

// const User = require('./modules/userModule')
// const Advice = require('./modules/adviceModule')
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());

app.use("/user", userRoute);
app.use("/advice", adviceRoute);

app.listen(port, () => {
  console.log(`server is connected on port : ${port} `);
});
