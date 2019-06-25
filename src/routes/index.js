const express = require("express");
const crypto = require("crypto");
const info = require("debug")("dispel:info");

const synthesizeSpeech = require("../lib/synthesizeSpeech");
const cached = require("../lib/cached");

const router = express.Router();

router.get("/", (req, res, next) => {
  const { input, voice } = req.query;

  const digest = crypto
    .createHash("md5")
    .update(JSON.stringify({ input, voice }))
    .digest("hex");

  const key = `${digest}.mp3`;

  cached(key, () => {
    info(`Synthesizing "${input}"`);
    return synthesizeSpeech({ input, voice: voice || "Matthew" }).then(
      ({ AudioStream }) => AudioStream
    );
  })
    .then(url => {
      res.send(req.xhr ? url : `<a href='${url}'>${key}</a>`);
    })
    .catch(next);
});

module.exports = router;
