const { MessageEmbed } = require("discord.js");
const { platform, arch, cpus } = require("os");
const { addReport } = require("../model");

exports.run = async(client, message, args) => {
  try {
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
    .setFooter("Powered By Replit.com")
        
    message.channel.send(embed).then(embedMessage => {
      embedMessage.react(`❎`);
      embedMessage.awaitReactions(filter, { max: 1}).then(collected =>{
          const reaction = collected.first();

          if (reaction.emoji.name === `❎`){
              embedMessage.delete(embed);
          }
      }).catch(collected => {console.log("Error"); addReport(`Bot-Error`, `stats.ts Error: ${e}`);});
  });
  } catch (e) {
    console.log(e);
    addReport(`Bot-Error`, `stats.ts Error: ${e}`);
  }
}
