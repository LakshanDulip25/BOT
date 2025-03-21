const { cmd } = require("../command");
const yts = require("yt-search");
const axios = require("axios");

cmd(
  {
    pattern: "video",
    react: "🎥",
    desc: "Download YouTube Video",
    category: "download",
    filename: __filename,
  },
  async (
    robin,
    mek,
    m,
    { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }
  ) => {
    try {
      if (!q) return reply("*⛔ Provide a video name or YouTube link!* 🎥❤️");

      // Search for the video
      const search = await yts(q);
      const data = search.videos[0];

      if (!data) {
        return reply("❌ *No results found. Try another keyword!*");
      }

      const url = data.url;

      // Video metadata description
      let desc = `
🎥 *ROBIN MAX VIDEO DOWNLOADER* 🎥

📌 *Title* : ${data.title}
⏳ *Duration* : ${data.timestamp}
👁️ *Views* : ${data.views}
📅 *Uploaded* : ${data.ago}
📺 *Channel* : ${data.author.name}
🔗 *Link* : ${data.url}

📌 *Made by ROBIN MAX*
`;

      // Send metadata with thumbnail
      await robin.sendMessage(
        from,
        { image: { url: data.thumbnail }, caption: desc },
        { quoted: mek }
      );

      // Video download function
      const downloadVideo = async (url, quality) => {
        const apiUrl = `https://p.oceansaver.in/ajax/download.php?format=${quality}&url=${encodeURIComponent(
          url
        )}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`;
        
        const response = await axios.get(apiUrl);

        if (!response.data || !response.data.success) {
          throw new Error("❌ Failed to fetch video details.");
        }

        const { id, title } = response.data;

        // Wait for download URL generation
        const progressUrl = `https://p.oceansaver.in/ajax/progress.php?id=${id}`;
        while (true) {
          const progress = await axios.get(progressUrl);

          if (progress.data.success && progress.data.progress === 100) {
            const videoBuffer = await axios.get(progress.data.download_url, {
              responseType: "arraybuffer",
            });
            return { buffer: videoBuffer.data, title };
          }

          await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds before checking again
        }
      };

      // Specify desired quality (default: 720p)
      const quality = "720";

      // Download and send video
      const video = await downloadVideo(url, quality);
      await robin.sendMessage(
        from,
        {
          video: video.buffer,
          mimetype: "video/mp4",
          caption: `🎥 *${video.title}*\n\n📌 *Made by ROBIN MAX*`,
        },
        { quoted: mek }
      );

      reply("*✅ Thanks for using my bot!* 🎥❤️");
    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);
