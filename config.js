const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "dUo0QYLK#K5J8jQTijPTiaMfBIKZDre1lHipjRU1VQHYTeMzGrvo",
  MONGODB: process.env.MONGODB || "mongodb://mongo:WEtNLNSgTiIxnEWmenCIowkFcOZZFyPZ@switchback.proxy.rlwy.net:36468",
  OWNER_NUM: process.env.OWNER_NUM || "94764232618",
};
