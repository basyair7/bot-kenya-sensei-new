const { Client, Collection, Intents } = require("discord.js");
const fs = require("fs");
let DateTimeBot = require("./model/DateTimeBot.js");
require("dotenv").config();

run(process.env.token, process.env.prefix);

require("http").createServer((_,res) => res.end("Bot is online")).listen(8080);

function run(token, prefix){
  const client = new Client({ intent: [ Intents.ALL ]});
  const config = {
    token: token,
    prefix: prefix
  };

  client.config = config;
  client.queue = new Map();

  // bot ready
  client.on("ready", async () => {
    console.log(`${client.user.tag} sudah online!`);
    client.user.setUsername(`Kenya-sensei 「 ${config.prefix} 」`);

    // Send Infomation Bot Online in Channel
    const ch1 = "798163730982502400";
    const ch2 = "929327327219957821";
    let ch;
    ch = client.channels.cache.find(channel => channel.id === ch1);
    ch.send(`Sensei-bot Kembali (${DateTimeBot})`);
    ch = client.channels.cache.find(channel => channel.id === ch2);
    ch.send(`Sensei-bot Kembali (${DateTimeBot})`);
  });

  // music bot commands
  fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
      const event = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, event.bind(null, client));
    });
  });

  client.commands = new Collection();

  fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
      if (!file.endsWith(".ts")) return;
      let props = require(`./commands/${file}`);
      let commandName = file.split(".")[0];
      console.log(`[Command Manager]: Loading Command ${commandName}`);
      client.commands.set(commandName, props);
    });
  });

  client.login(config.token);
}
