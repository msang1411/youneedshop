const express = require("express");
var morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());

// CORS

// Database
// Mongodb

// Routers
app.use("/", (req, res, next) => res.send({ check: "okw" }));

// Middleware error handling
// app.use(errorHandlingMiddleware);

app.listen(port);
