/* 
* Plugin Author: Dark-Yasiya
* Follow Us: https://whatsapp.com/channel/0029VaaPfFK7Noa8nI8zGg27
*/

const { exec } = require('child_process');
const { cmd } = require('../command');

cmd({
    pattern: "py",
    alias: ["python", "pyrun"],
    react: "🐍",
    desc: "Run Python code",
    category: "utility",
    use: ".py <python code>",
    filename: __filename
}, async (conn, m, mek, { from, q, reply }) => {
    try {
        if (!q) {
            return await reply("❌ Please provide Python code to execute!");
        }

        // Run Python code using child_process
        exec(`python3 -c "${q.replace(/"/g, '\\"')}"`, (error, stdout, stderr) => {
            if (error) {
                return reply(`❌ Error: ${stderr || error.message}`);
            }
            reply(`✅ Output:\n\n${stdout}`);
        });
    } catch (e) {
        console.log(e);
        await reply(`❌ *An error occurred:* ${e.message ? e.message : "Error!"}`);
    }
});
