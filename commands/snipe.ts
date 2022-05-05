const {addReport} = require("../model/dbReport");
const {readSnipemsg} = require("../model/dbMessage");
const { MessageEmbed } = require("discord.js");
const firebase = require("../db/firebaseConfig");

module.exports.run = async(client, message, args) => {
    try {
       var input = args[0];
       var user = client.users.cache.get(input) || client.users.cache.find(x => x.username == input) || message.guild.members.cache.get(input)?.user || message.mentions.users.first() || message.author;
       
        readSnipemsg((data) => {
            Object.keys(data).map((key) =>{
                // let SelectTime = message.content.split(': ');
                let dbUser = data[key].author;
                
                if(user.tag === dbUser){
                    const msgembed = new MessageEmbed()
                    .setAuthor(dbUser, user.displayAvatarURL())
                    .setDescription(data[key].content)
                    .setFooter(`Pesan Terciduk Nak XD | ${data[key].datetime}`)
                    return message.channel.send(msgembed).then(msg => { msg.delete({timeout: 10000}) });
                }
            })
        })

        /*
        const msg = client.snipes.get(message.channel.id);
        const msgembed = new MessageEmbed()
        .setAuthor(msg.author, msg.member.user.displayAvatarURL())
        .setDescription(msg.content)
        .setFooter("Pesan Terciduk Nak XD")
        .setTimestamp();

        return message.channel.send(msgembed);
        */
        
        
    } catch (e) {
        console.log(e);
        addReport(`Bot-Error`, `snipe.ts Error: ${e}`);
    }
}
