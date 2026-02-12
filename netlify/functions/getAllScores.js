const fs = require("fs");
const ADMIN_PASSWORD = "1234"; // 변경 필수

exports.handler = async (event) => {
  const body = JSON.parse(event.body);

  if(body.password !== ADMIN_PASSWORD){
    return { statusCode:403, body:"접근 불가" };
  }

  if (!fs.existsSync("./scores.json")) {
    return { statusCode:200, body: JSON.stringify([]) };
  }

  const scores = JSON.parse(fs.readFileSync("./scores.json"));
  return { statusCode:200, body: JSON.stringify(scores) };
};
