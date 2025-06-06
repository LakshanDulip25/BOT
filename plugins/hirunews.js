const axios = require('axios');
const { cmd } = require('../command');
const { fetchJson } = require('../lib/functions');

// This Plugin Created By Suhas Bro ➠ SUHAS-MD
// Don't Sell This Plugin in Enyone. This Plugin is Give Free.
// Subscribe me on YouTube ➠ @suhasbro
// https://www.youtube.com/@suhasbro

cmd({
    pattern: "hirucheck",
    alias: ["hirunews", "newshiru", "hirulk"],
    react: "⭐",
    category: "search hiru news",
    desc: "Fetch the latest news from the SUHAS API in Hiru API.",
    use: "",
    filename: __filename,
},
    async (conn, mek, m, {
        from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber,
        botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName,
        participants, groupAdmins, isBotAdmins, isAdmins, reply
    }) => {
        try {
            const apiUrl = 'https://suhas-bro-apii.vercel.app/hiru'; // Don't Change This API Key
            const response = await axios.get(apiUrl);
            const data = response.data;

            if (!data || !data.newsURL || !data.title || !data.image || !data.text) {
                return await reply('*No News Available At This Moment* ❗');
            }

            const { newsURL, title, image, text, Power } = data;

            let newsInfo = "𝐒𝐔𝐇𝐀𝐒-𝐌𝐃 𝐇𝐢𝐫𝐮 𝐍𝐞𝐰𝐬 𝐔𝐩𝐝𝐚𝐭𝐞 📰\n\n";
            newsInfo += `✨ *Title*: ${title}\n\n`;
            newsInfo += `📑 *Description*:\n${text}\n\n`;
            newsInfo += `⛓️‍💥 *Url*: www.hirunews.lk\n\n`;
            newsInfo += `> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*\n\n*${Power}*`;

            if (image) {
                await conn.sendMessage(m.chat, {
                    image: { url: image },
                    caption: newsInfo,
                }, { quoted: m });
            } else {
                await conn.sendMessage(m.chat, { text: newsInfo }, { quoted: m });
            }

        } catch (error) {
            console.error('Error fetching news:', error);
            await reply('*An Error Occurred While Fetching News At This Moment* ❗');
        }
    }
);
