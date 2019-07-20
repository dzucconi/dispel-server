const express = require("express");
const crypto = require("crypto");

const synthesizeSpeech = require("../lib/synthesizeSpeech");
const cached = require("../lib/cached");

const router = express.Router();

router.get("/", (req, res, next) => {
  const {
    input = "Hello world",
    voice = "Matthew",
    mode = "text",
    redirect = false
  } = req.query;

  const digest = crypto
    .createHash("md5")
    .update(JSON.stringify({ input, voice, mode }))
    .digest("hex");

  const key = `${digest}.mp3`;

  cached(key, () => {
    return synthesizeSpeech({ input, voice, mode }).then(
      ({ AudioStream }) => AudioStream
    );
  })
    .then(url => {
      redirect
        ? res.redirect(url)
        : res.send(req.xhr ? url : `<a href='${url}'>${key}</a>`);
    })
    .catch(next);
});

module.exports = router;
