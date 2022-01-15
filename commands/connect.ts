const { MessageEmbed } = require("discord.js");
const ms = require("pretty-ms");

exports.run = async (client, message) => {
  const channel = message.member.voice.channel;
  /*
  setInterval(() => {
          const uptime = ms(client.uptime, {verbose:true});
          client.user.setActivity(`Online at ${uptime}`);
  }, 3000);
  */
  client.user.setActivity("Online");

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
};
