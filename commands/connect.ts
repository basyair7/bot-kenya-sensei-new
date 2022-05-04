const { MessageEmbed } = require("discord.js");
const { addReport } = require("../model/dbReport")
const ms = require("pretty-ms");

exports.run = async (client, message) => {
  try {
    const channel = message.member.voice.channel;
    /*
    setInterval(() => {
            const uptime = ms(client.uptime, {verbose:true});
            client.user.setActivity(`Online at ${uptime}`);
    }, 3000);
    */
    client.user.setActivity(`Online ${DateTimeBot()}`);

    if (!channel)
      return message.channel.send(
        "KAMU HARUS JOIN CHANNEL DULU NAK!"
      ).then(message => message.delete({timeout: 10000}));

    if (!channel.permissionsFor(message.client.user).has("CONNECT"))
      return console.error("I don't have permission to join the voice channel");

    if (!channel.permissionsFor(message.client.user).has("SPEAK"))
      return console.error("I don't have permission to speak in the voice channel");

    await channel.join().then(connection => connection.voice.setSelfDeaf(true));

    return message.channel.send(
      new MessageEmbed()
        .setDescription("**Joined the voice channel :white_check_mark: **")
        .setColor("BLUE")
    ).then(message => message.delete({timeout: 10000}));
  } catch (err) {
    console.log(err);
    addReport(`Bot-Error`, `clear.ts Error: ${err}`);
  }
};

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
