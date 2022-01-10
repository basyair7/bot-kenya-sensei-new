const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
  const queue = message.client.queue.get(message.guild.id);

  if (!queue){
    message.delete({timeout: 1000});
    return message.channel.send(
      ":x: There are no songs playing in this server"
    ).then(message => message.delete({timeout: 10000}));}

  queue.loop = !queue.loop;
  message.channel.send(
    new MessageEmbed()
      .setAuthor(
        "Music Loop Controller",
        "https://img.icons8.com/color/2x/refresh--v2.gif"
      )
      .setColor("BLUE")
      .setTimestamp()
      .setDescription(
        "**Loop is" +
          (queue.loop == true ? " Enabled " : " Disabled ") +
        "for current song :white_check_mark: **"
      )
  ).then(message => message.delete({timeout: 10000}));
};
