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
    s3.headObject({ Key: key }, err => {
      if (bypass || (err && err.code === "NotFound")) {
        info(bypass ? "Bypassing cache" : `Cache miss: ${key}`);
        info(`Writing "${key}"`);

        asyncFn()
          .then(body => {
            console.log(body);
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
          .catch(reject);
      } else {
        info(`Cache hit: ${key}`);
        return resolve(qualifiedUrl(key));
      }
    });
  });
