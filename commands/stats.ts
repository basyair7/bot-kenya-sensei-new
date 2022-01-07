const { MessageEmbed } = require("discord.js")
const { platform, arch, cpus } = require("os")

exports.run = async(client, message, args) => {
  const model = cpus()[0].model + " " + arch()
  const tanggalBuat = client.user.createdAt

  const filter = (reaction, user) => {
    return [`❎`].includes(reaction.emoji.name) && user.id === message.author.id;
  };
  
  const embed = new MessageEmbed()
  .setColor("RANDOM")
  .setTitle("Bot Statistics")
  .setThumbnail(client.user.displayAvatarURL())
  .addField("Bot", `
Username: ${client.user.username}
Tanggal Dibuat: ${tanggalBuat}`)
  .addField("System", `
CPU: ${model}
Platform: ${platform}
Websocket: ${client.ws.ping} ms(miliseconds)`)
  
message.channel.send(embed).then(embedMessage => {
  embedMessage.react(`❎`);
  embedMessage.awaitReactions(filter, { max: 1}).then(collected =>{
      const reaction = collected.first();

      if (reaction.emoji.name === `❎`){
          embedMessage.delete(embed);
      }
  });
});
}
