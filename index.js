const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const client = new Discord.Client();
const fs = require("fs");

// all cron jobs goes here
const initJob = data => {
  let fetchJSON = setInterval(async () => {
    let jsonData = await getData();

    if (data[0].source !== jsonData[0].source) {
      let newData = jsonData.filter(f => {
        return !data.some(s => {
          return s.source === f.source;
        });
      });
      handleAlerts(newData);
      data = jsonData;
    }
  }, 2000);
};

// fetch data from json file
const getData = async () => {
  let jsonData;
  try {
    jsonData = await JSON.parse(fs.readFileSync(botconfig.watch));
  } catch (e) {
    console.log(e);
  }

  return jsonData;
};

// for setting bot displayed status on discord
const handleStatus = () => {
  client.user.setActivity("BitScrape", { type: "LISTENING" });
};

// new data message
const handleAlerts = newData => {

  newData.map(data => {
    const postEmbed = new Discord.RichEmbed()
      .setColor("#55DE63")
      .setTitle(data.title)
      .setURL(data.source)
      .setTimestamp()
  
    client.channels.get("627974499098165258").send(postEmbed);
  })
};

client.on("ready", async () => {
  let data = await getData();
  handleStatus();
  initJob(data);
});

client.login(botconfig.token);
