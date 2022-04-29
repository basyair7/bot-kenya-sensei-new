const ms = require("pretty-ms");
const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
  const channel = message.member.voice.channel;
  client.user.setActivity(`Online ${DateTimeBot()}`);
  /*
  setInterval(() => {
          const uptime = ms(client.uptime, {verbose:true});
          client.user.setActivity(`Online at ${uptime}`);
  }, 3000);
  */
  
  if (!channel){
    return message.channel.send(
      "KAMU HARUS JOIN CHANNEL DULU NAK!"
    ).then(message => message.delete({timeout: 10000}));
  }

  await channel.leave();

  return message.channel.send(
    new MessageEmbed()
      .setDescription("**Left the voice channel :white_check_mark: **")
      .setColor("BLUE")
  ).then(message => message.delete({timeout: 10000}));
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
