const { MessageEmbed } = require("discord.js");
const {addReport} = require("../model/dbReport");

module.exports = {
    name: "servericon",
    description: "Show icon server",
    run: async(client, message, args) => {
        try {
            const filter = (reaction, user) => {
                return [`❎`].includes(reaction.emoji.name) && user.id === message.author.id;
            };

            const embed = new MessageEmbed()
                .setTitle("Server Icon")
                .setColor('#7289da')
                .setImage(message.guild.iconURL({dynamic: true, size: 4096}));

            message.channel.send(embed).then(embedMessage => {
                embedMessage.react(`❎`);
                embedMessage.awaitReactions(filter, { max: 1}).then(collected =>{
                    const reaction = collected.first();

                    if (reaction.emoji.name === `❎`){
                        embedMessage.delete({timeout: 10000});
                    }
                }).catch(collected => {console.log("error")});
            });
        } catch (e) {
            console.log(e);
            addReport(`Bot-Error`, `servericon.ts Error: ${e}`);
        }
    }
}
