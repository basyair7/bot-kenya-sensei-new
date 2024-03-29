const { MessageEmbed } = require("discord.js");
const model = require("../model");

exports.run = async (client, msg, args) => {
  try{
    var input = args[0]
    var user = client.users.cache.get(input) || client.users.cache.find(x => x.username == input) || msg.guild.members.cache.get(input)?.user || msg.mentions.users.first() || msg.author
    let embed = new MessageEmbed()
    .setTitle(`${user.tag}`)
    .setDescription("Noh Muka mu nak.")
    .setImage(user.displayAvatarURL({dynamic:true, size:4096}))
    .setColor("RANDOM");

    const filter = (reaction, user) => {
      return [`❎`].includes(reaction.emoji.name) && user.id === msg.author.id;
    };

    msg.channel.send(embed).then(embedMessage => {
        embedMessage.react(`❎`);
        embedMessage.awaitReactions(filter, { max: 1 }).then(collected =>{
            const reaction = collected.first();

            if (reaction.emoji.name === `❎`){
                embedMessage.delete({timeout: 5000});
            }
        }).catch(collected => {console.log("Error")});
    });
  } catch (e){
    console.log(e);
    model.addReport(`Bot-Error`, `mukaku Error: ${e}`);
  }
}
