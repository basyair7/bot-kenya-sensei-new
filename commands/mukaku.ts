const { MessageEmbed } = require("discord.js")

exports.run = async (client, msg, args) => {
  const input = args.join(' ')
  const user = client.users.cache.get(input) || client.users.cache.find(x => x.username == input) || msg.mentions.users.first() || msg.author
  const embed = new MessageEmbed()
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
              embedMessage.delete(embed);
          }
      }).catch(collected => {console.log("Error")});
  });
}
