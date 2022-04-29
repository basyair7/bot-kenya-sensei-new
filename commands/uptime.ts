const ms = require("pretty-ms")
const { MessageEmbed } = require("discord.js")

exports.run = async(client, message, args) => {
  const uptime = ms(client.uptime, {verbose:true})
  const embed = new MessageEmbed()
  .addField("Date", DateTimeBot())
  .addField("Bot Uptime", uptime)
  .setColor("RANDOM")
  
  message.channel.send(embed).then(message => message.delete({timeout: 10000}));
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
