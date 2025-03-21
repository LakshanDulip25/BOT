const { cmd, commands } = require("../command");
const yts = require("yt-search");
const { ytmp4 } = require("@vreden/youtube_scraper");

cmd(
  {
    pattern: "video",
    react: "🎥",
    desc: "Download video",
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
      if (!q) return reply("*⛔ Please provide a video name or link!* ❤️");

      // Search for the video
      const search = await yts(q);
      const data = search.videos[0];

      if (!data) {
        return reply("❌ *No results found. Try a different keyword!*");
      }

      const url = data.url;

      // Validate timestamp
      if (!data.timestamp) {
        return reply("❌ *Error: Unable to retrieve video duration.*");
      }

      let durationParts = data.timestamp.split(":").map(Number);
      let totalSeconds =
        durationParts.length === 3
          ? durationParts[0] * 3600 + durationParts[1] * 60 + durationParts[2]
          : durationParts[0] * 60 + durationParts[1];

      if (totalSeconds > 1800) {
        return reply("⏱️ *Video limit is 30 minutes!*");
      }

      // Video metadata description
      let desc = `
*❤️ROBIN VIDEO DOWNLOADER❤️*

🎬 *Title* : ${data.title}
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

      // Download the video using @vreden/youtube_scraper
      const quality = "360"; // Change quality if needed
      const videoData = await ytmp4(url, quality).catch((err) => {
        console.error(err);
        return null;
      });

      if (!videoData || !videoData.download || !videoData.download.url) {
        return reply("❌ *Error: Unable to fetch the video. Please try again later!*");
      }

      // Send video file
      await robin.sendMessage(
        from,
        {
          video: { url: videoData.download.url },
          mimetype: "video/mp4",
          caption: "🎥 *Here is your requested video!*",
        },
        { quoted: mek }
      );

      // Send as a document (optional)
      await robin.sendMessage(
        from,
        {
          document: { url: videoData.download.url },
          mimetype: "video/mp4",
          fileName: `${data.title}.mp4`,
          caption: "📌 *Made by S_I_H_I_L_E_L*",
        },
        { quoted: mek }
      );

      return reply("*✅ Thanks for using my bot!* 🎥❤️");
    } catch (e) {
      console.error(e);
      reply(`❌ *Error: ${e.message}*`);
    }
  }
);
