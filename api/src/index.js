const express = require("express");
var morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();

const { errorHandlingMiddleware } = require("./middlewares/errorHandling");
const adminRouter = require("./routes/admin.router");

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());

// CORS

// Database
require("./db/mongodb");

// Routers
app.use("/api/v1/admin", adminRouter);

// Middleware error handling
app.use(errorHandlingMiddleware);

app.listen(port);
