const ms = require("pretty-ms");
const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
  const channel = message.member.voice.channel;
  client.user.setActivity("Online");
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
