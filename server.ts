const { Client, Collection, Intents } = require("discord.js");
const { addReport } = require("./model/dbReport");
const fs = require("fs");
require("dotenv").config();
const express = require("express");
const app = express();

let port = process.env.port || 5000;


app.get("/", (req, res) => {
  res.send("Bot Kenya-sensei sudah online!");
});
app.listen(port, ()=>{
  console.log(`Example app is listening on port https://localhost:${port}`);
});


run(process.env.token, process.env.prefix);
//require("http").createServer((_,res) => res.end("Bot is online")).listen(8080);

function run(token, prefix){
  try {
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
      client.user.setActivity(`Online ${DateTimeBot()}`);
      addReport(`History-Bot-re-login`, `Datetime : ${DateTimeBot()}`);
  
      // Send Infomation Bot Online in Channel
      const ch1 = "798163730982502400";
      const ch2 = "929327327219957821";
      let ch;
      ch = client.channels.cache.find(channel => channel.id === ch1);
      ch.send(`Sensei-bot Kembali (${DateTimeBot()})`).then(msg => msg.delete({timeout: 10000}));
      ch = client.channels.cache.find(channel => channel.id === ch2);
      ch.send(`Sensei-bot Kembali (${DateTimeBot()})`).then(msg => msg.delete({timeout: 10000}));
      
    });
  
  
    fs.readdir("./events/", (err, files) => {
      if (err) return console.error(err);
      files.forEach((file) => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
      });
    });
  
    client.commands = new Collection();
    client.snipes = new Collection();
  
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
  } catch (error) {
    addReport(`Bot-Error`, `Server.ts Error: ${error}`)
  }
} 
  
  var { DateTime } = require("luxon");
  
  function DateTimeBot(){
    var local = DateTime.local();
    var rezonedString = local.setZone("Asia/Jakarta");
    
    // get Date
    let year = rezonedString.c.year;
    let month = rezonedString.c.month;
    let day = rezonedString.c.day;
    
    // get Time
    let hour = rezonedString.c.hour;
    let minute = rezonedString.c.minute;
    let second = rezonedString.c.second;
    
    let datetime = year+"/"+month+"/"+day+" ("+hour+":"+minute+":"+second+")";
    return datetime;
  }
