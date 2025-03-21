const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "dUo0QYLK#K5J8jQTijPTiaMfBIKZDre1lHipjRU1VQHYTeMzGrvo",
  OWNER_NUM: process.env.OWNER_NUM || "94764232618",
  PREFIX: process.env.PREFIX || ".",
  ALIVE_IMG: process.env.ALIVE_IMG || "https://raw.githubusercontent.com/Dark-Robin/Bot-Helper/refs/heads/main/autoimage/Bot%20robin%20iz%20alive.jpg",
  ALIVE_MSG: process.env.ALIVE_MSG || "WORKING...",
  MODE: process.env.MODE || "public",
  AUTO_VOICE: process.env.AUTO_VOICE || "true",
  AUTO_REPLY: process.env.AUTO_REPLY || "true",
  AUTO_STICKER: process.env.AUTO_STICKER || "true",
};
