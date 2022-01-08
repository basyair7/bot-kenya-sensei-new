const { Client, Collection, Intents } = require("discord.js");
const fs = require("fs");
require("dotenv").config();

run(process.env.token, process.env.prefix);

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
    client.user.setUsername("Kenya-sensei 「 Ks. 」");
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
