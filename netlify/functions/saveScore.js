const fs = require("fs");
const path = "./scores.json";

exports.handler = async (event) => {
  const data = JSON.parse(event.body);
  let scores = [];

  if (fs.existsSync(path)) {
    scores = JSON.parse(fs.readFileSync(path));
  }

  scores.push({
    name: data.name,
    phone: data.phone,
    time: data.time,
    createdAt: Date.now()
  });

  scores.sort((a,b)=>{
    if(a.time === b.time){
      return a.createdAt - b.createdAt;
    }
    return a.time - b.time;
  });

  fs.writeFileSync(path, JSON.stringify(scores));

  return { statusCode: 200, body: "ok" };
};
