const { MessageEmbed } = require("discord.js");
exports.run = async(client, message, args) => {
    let peringatan = new MessageEmbed()
    .setTitle("Restart Bot Kenya-Sensei")
    .setDescription("Peringatan!")
    .setThumbnail(client.user.displayAvatarURL())
    .addField("Peringatan merestart bot!!!", `Jika bot direstart lebih dari 2x akan mengakibatkan bot kenya-sensei menjadi offline sementara...\n
             Jika Melanjutkan Tekan :white_check_mark: , Jika tidak tekan :negative_squared_cross_mark: `)
    
    const filter = (reaction, user) => {
        return [`✅`, `❎`].includes(reaction.emoji.name) && user.id === msg.author.id;
    };
    
    message.channel.send(peringatan).then(embedMessage => {
          embedMessage.react(`:white_check_mark:`);
          embedMessage.react(`:negative_squared_cross_mark:`);
          embedMessage.awaitReactions(filter, { max: 1 }).then(collected =>{
              const reaction = collected.first();

              if (reaction.emoji.name === `❎`){
                  embedMessage.delete(embed);
              }
              else if (reaction.emoji.name === `✅`) {
                  message.channel.send('Restarting bot...');
                  return process.exit();
              }
          }).catch(collected => {console.log("Error")});
      });
}
  
