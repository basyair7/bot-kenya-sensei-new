const { Client, Collection, Intents } = require("discord.js");
const model = require("./model");
const fs = require("fs");
require("dotenv").config();

const express = require("express");
const app = express();

let port = process.env.PORT || 3000;


app.get("/", (req, res) => {
  res.send("Bot Kenya-sensei sudah online!");
});
app.listen(port, () => {
  console.log(`Example app is listening on port https://localhost:${port}`);
});

// require("http").createServer((_,res) => res.end("Bot Kenya-sensei sudah online!")).listen(process.env.PORT || 3000);

try {
  const client = new Client({ intent: [Intents.ALL] });
  const config = {
    token: process.env.CLIENT_TOKEN,
    prefix: process.env.CLIENT_PREFIX
  };

  client.config = config;
  client.queue = new Map();

  fs.readdir("./src/events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
      const event = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, event.bind(null, client));
    });
  });

  client.commands = new Collection();
  client.snipes = new Collection();

  fs.readdir("./src/commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
      if (!file.endsWith(".js")) return;
      let props = require(`./commands/${file}`);
      let commandName = file.split(".")[0];
      console.log(`[Command Manager]: Loading Command ${commandName}`);
      client.commands.set(commandName, props);
    });
  });

  client.login(config.token);
} catch (error) {
  model.addReport(`Bot-Error`, `Server Error: ${error}`)
}
