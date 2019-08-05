const info = require("debug")("dispel:info");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  region: "us-east-1",
  params: {
    Bucket: process.env.AWS_S3_BUCKET
  }
});

const qualifiedUrl = key =>
  `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${key}`;

module.exports = (key, asyncFn, bypass = false) =>
  new Promise((resolve, reject) => {
    info(`Checking ${key}`);

    s3.headObject({ Key: key }, err => {
      if (bypass || (err && err.code === "NotFound")) {
        info(bypass ? "Bypassing cache" : `Cache miss: ${key}`);

        return asyncFn()
          .then(body => {
            return s3
              .putObject({
                Key: key,
                ContentType: "audio/mpeg",
                Body: body,
                CacheControl: "max-age=31536000",
                ACL: "public-read"
              })
              .promise();
          })
          .then(() => {
            info(`Wrote ${key}`);
            return resolve(qualifiedUrl(key));
          })
          .catch(err => {
            return reject(err);
          });
      }

      if (err) {
        return reject(err);
      }

      info(`Cache hit: ${key}`);
      return resolve(qualifiedUrl(key));
    });
  });
