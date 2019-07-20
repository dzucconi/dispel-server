const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cors = require("cors");
const logger = require("morgan");
const error = require("debug")("dispel:error");

const indexRouter = require("./routes/index");

const app = express();

const { ALLOWED_ORIGINS } = process.env;
const allowedOrigins = (ALLOWED_ORIGINS && ALLOWED_ORIGINS.split(",")) || [];

app
  .use(logger("dev"))
  .use(cors({ ...(allowedOrigins.length ? { origin: allowedOrigins } : {}) }))
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
  error(err);

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
