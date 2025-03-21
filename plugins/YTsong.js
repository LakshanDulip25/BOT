const { cmd, commands } = require("../command");
const yts = require("yt-search");
const { ytmp3 } = require("@vreden/youtube_scraper");

cmd(
  {
    pattern: "song",
    react: "🎵",
    desc: "Download Song",
    category: "download",
    filename: __filename,
  },
  async (
    robin,
    mek,
    m,
    {
      from,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
      if (!q) return reply("*⛔ Please provide a song name or link!* ❤️");

      // Search for the video
      const search = await yts(q);
      const data = search.videos[0];

      if (!data) {
        return reply("❌ *No results found. Try a different keyword!*");
      }

      const url = data.url;

      // Validate timestamp
      if (!data.timestamp) {
        return reply("❌ *Error: Unable to retrieve song duration.*");
      }

      let durationParts = data.timestamp.split(":").map(Number);
      let totalSeconds =
        durationParts.length === 3
          ? durationParts[0] * 3600 + durationParts[1] * 60 + durationParts[2]
          : durationParts[0] * 60 + durationParts[1];

      if (totalSeconds > 1800) {
        return reply("⏱️ *Audio limit is 30 minutes!*");
      }

      // Song metadata description
      let desc = `
*❤️ROBIN SONG DOWNLOADER❤️*

🎶 *Title* : ${data.title}
📝 *Description* : ${data.description || "No description available"}
⏳ *Duration* : ${data.timestamp}
📅 *Uploaded* : ${data.ago}
👁️ *Views* : ${data.views}
🔗 *URL* : ${data.url}

📌 *Made by S_I_H_I_L_E_L*
`;

      // Send metadata with thumbnail
      await robin.sendMessage(
        from,
        { image: { url: data.thumbnail }, caption: desc },
        { quoted: mek }
      );

      // Download the audio using @vreden/youtube_scraper
      const quality = "128"; // Default quality
      const songData = await ytmp3(url, quality).catch((err) => {
        console.error(err);
        return null;
      });

      if (!songData || !songData.download || !songData.download.url) {
        return reply("❌ *Error: Unable to fetch the song. Please try again later!*");
      }

      // Send audio file
      await robin.sendMessage(
        from,
        {
          audio: { url: songData.download.url },
          mimetype: "audio/mpeg",
        },
        { quoted: mek }
      );

      // Send as a document (optional)
      await robin.sendMessage(
        from,
        {
          document: { url: songData.download.url },
          mimetype: "audio/mpeg",
          fileName: `${data.title}.mp3`,
          caption: "📌 *Made by S_I_H_I_L_E_L*",
        },
        { quoted: mek }
      );

      return reply("*✅ Thanks for using my bot!* 🌚❤️");
    } catch (e) {
      console.error(e);
      reply(`❌ *Error: ${e.message}*`);
    }
  }
);
