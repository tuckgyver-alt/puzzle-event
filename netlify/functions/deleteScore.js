const fs = require("fs");
const ADMIN_PASSWORD = "1234";

exports.handler = async (event) => {
  const body = JSON.parse(event.body);

  if(body.password !== ADMIN_PASSWORD){
    return { statusCode:403, body:"접근 불가" };
  }

  if (!fs.existsSync("./scores.json")) {
    return { statusCode:200, body:"삭제할 데이터 없음" };
  }

  fs.writeFileSync("./scores.json", JSON.stringify([]));

  return { statusCode:200, body:"전체 기록 삭제 완료" };
};
