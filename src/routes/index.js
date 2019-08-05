const express = require("express");
const crypto = require("crypto");
const AWS = require("aws-sdk");

const synthesizeSpeech = require("../lib/synthesizeSpeech");
const cached = require("../lib/cached");

const router = express.Router();
const polly = new AWS.Polly({ apiVersion: "2016-06-10" });

router
  .get("/", (req, res, next) => {
    const {
      input = "Hello world",
      voice = "Matthew",
      mode = "text",
      engine = "standard",
      redirect = false
    } = req.query;

    const digest = crypto
      .createHash("md5")
      .update(JSON.stringify({ input, voice, mode, engine }))
      .digest("hex");

    const key = `${digest}.mp3`;

    cached(key, () => {
      return synthesizeSpeech({ input, voice, mode, engine }).then(
        ({ AudioStream }) => AudioStream
      );
    })
      .then(url => {
        redirect
          ? res.redirect(301, url)
          : res.send(req.xhr ? url : `<a href='${url}'>${key}</a>`);
      })
      .catch(next);
  })

  .get("/status", (_req, res) => {
    res.sendStatus(200);
  })

  .get("/voices", (req, res, next) => {
    polly.describeVoices(null, (err, { Voices }) => {
      if (err) return next(err);
      res.json(Voices);
    });
  });

module.exports = router;
