const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "hchDUIJS#4nXTaMvvabIOhoJzdm9qEpsn24fMrHRBv8eLRC83o4o",
  OWNER_NUM: process.env.OWNER_NUM || "94764232618",
  PREFIX: process.env.PREFIX || ".",
  ALIVE_IMG: process.env.ALIVE_IMG || "https://raw.githubusercontent.com/Dark-Robin/Bot-Helper/refs/heads/main/autoimage/Bot%20robin%20iz%20alive.jpg",
  ALIVE_MSG: process.env.ALIVE_MSG || "WORKING...",
  MODE: process.env.MODE || "public",
  AUTO_VOICE: process.env.AUTO_VOICE || "true",
  AUTO_REPLY: process.env.AUTO_REPLY || "true",
  AUTO_STICKER: process.env.AUTO_STICKER || "true",
  GEMINI_API_KEY‎: process.env.GEMINI_API_KEY‎ || "AIzaSyAXp5mTDLNRA7lIfkSIlcMiQd9f-lBg0Aw",
  MOVIE_API_KEY: process.env.MOVIE_API_KEY || "sky|b0a281b0c359c6d0e45cd146e2c2a21f15927bf6",
};
