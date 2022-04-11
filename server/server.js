const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");

const port = process.env.PORT || 3000;
const app = express();

app.use([
  morgan("dev"),
  cors(),
  helmet(),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
]);

app.get("/", (req, res) => {
  return res.json("hi");
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
