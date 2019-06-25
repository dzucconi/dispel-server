const AWS = require("aws-sdk");

const polly = new AWS.Polly({ apiVersion: "2016-06-10" });

module.exports = ({ input = "hello world", voice = "Matthew" }) =>
  new Promise((resolve, reject) => {
    polly.synthesizeSpeech(
      {
        OutputFormat: "mp3",
        SampleRate: "16000",
        Text: input,
        TextType: "text",
        VoiceId: voice
      },
      (err, data) => {
        if (err) return reject(err);
        return resolve(data);
      }
    );
  });
