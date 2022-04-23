const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const dotenv = require("dotenv-flow");

const routes = require("./routes");

dotenv.config();

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, (error) => {
  if (error) {
    return console.error(error);
  }
  console.log("database connected");
});

const app = express();

app.use([
  morgan("dev"),
  cors(),
  helmet(),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
]);

app.use("/api", routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
