const express = require("express");
var morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();

const { errorHandlingMiddleware } = require("./middlewares/errorHandling");
const adminRouter = require("./routes/admin.router");
const adminPositionRouter = require("./routes/adminPosition.router");
const adminRoleRouter = require("./routes/adminRole.router");
const adminPermissionRouter = require("./routes/adminPermission.router");

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
app.use("/api/v1/admin-position", adminPositionRouter);
app.use("/api/v1/admin-role", adminRoleRouter);
app.use("/api/v1/admin-permission", adminPermissionRouter);

// Middleware error handling
app.use(errorHandlingMiddleware);

app.listen(port);
