const AWS = require("aws-sdk");
const info = require("debug")("dispel:info");

const polly = new AWS.Polly({ apiVersion: "2016-06-10" });

module.exports = ({
  input = "hello world",
  voice = "Matthew",
  mode = "text"
}) => {
  info(`Synthesizing "${input} (voice: ${voice}, mode: ${mode})"`);

  return new Promise((resolve, reject) => {
    polly.synthesizeSpeech(
      {
        OutputFormat: "mp3",
        SampleRate: "16000",
        Text: input,
        TextType: mode,
        VoiceId: voice
      },
      (err, data) => {
        if (err) return reject(err);
        return resolve(data);
      }
    );
  });
};
