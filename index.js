const Discord = require("discord.js");
const botconfig = require('./botconfig.json');
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Connected as ${client.user.tag}`);

  client.user.setStatus("for orders", { type: "LISTENING" });

  let cn_bitscrape = client.channels.get("627974499098165258");
});

client.on("message", msg => {
  if (msg.author === client.user) return;

  if (msg.content.startsWith(botconfig.prefix)) {
    msg.channel.send(
      `Sorry ${msg.author.toString()}, I don't understand the command '${msg.content.substr(
        1
      )}'`
    );
  }
});

client.login(botconfig.token);

