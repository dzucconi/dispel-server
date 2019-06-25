const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cors = require("cors");
const logger = require("morgan");

const indexRouter = require("./routes/index");

const app = express();

app
  .use(logger("dev"))
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// Catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, _next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.json({
    code: err.status,
    message: err.message
  });
});

module.exports = app;
