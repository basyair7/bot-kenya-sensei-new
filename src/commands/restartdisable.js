const { MessageEmbed } = require("discord.js");
const { addReport } = require("../model");

exports.run = async(client, message, args) => {
    try {
        let peringatan = new MessageEmbed()
        .setTitle("Restart Bot Kenya-Sensei")
        .setDescription("Peringatan!")
        .setThumbnail(client.user.displayAvatarURL())
        .addField("Peringatan merestart bot!!!", `Jika bot direstart lebih dari 2x akan mengakibatkan bot kenya-sensei menjadi offline sementara...\n
                Jika Melanjutkan Tekan :white_check_mark: , Jika tidak tekan :negative_squared_cross_mark: `)
        
        const filter = (reaction, user) => {
            return [`✅`, `❎`].includes(reaction.emoji.name) && user.id === message.author.id;
        };
        
        message.channel.send(peringatan).then(embedMessage => {
            embedMessage.react(`✅`);
            embedMessage.react(`❎`);
            embedMessage.awaitReactions(filter, { max: 1 }).then(async collected =>{
                const reaction = collected.first();

                if (reaction.emoji.name === `✅`) {
                    embedMessage.delete({timeout: 5000});
                    embedMessage.channel.send('Restarting bot...').then(async m => {
                        await process.exit();
                    });
                }
                else if (reaction.emoji.name === `❎`) {
                    embedMessage.delete({timeout: 10000});
                }
            }).catch(collected => {console.log("Error")});
        });
    } catch (e) {
        console.log(e);
        addReport(`Bot-Error`, `restart.ts Error: ${e}`);
    }
}
  
