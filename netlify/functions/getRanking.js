const fs = require("fs");

exports.handler = async () => {
  if (!fs.existsSync("./scores.json")) {
    return { statusCode:200, body: JSON.stringify([]) };
  }

  let scores = JSON.parse(fs.readFileSync("./scores.json"));
  return {
    statusCode:200,
    body: JSON.stringify(scores.slice(0,5))
  };
};
