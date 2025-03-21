const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "VB5kBLZJ#ES7HFQ3uJdewJy1uwu3fx1o1_2Tw_h_hT01UXOFcxf4",
  MONGODB: process.env.MONGODB || "mongodb://mongo:WEtNLNSgTiIxnEWmenCIowkFcOZZFyPZ@switchback.proxy.rlwy.net:36468",
  OWNER_NUM: process.env.OWNER_NUM || "94764232618",
};
