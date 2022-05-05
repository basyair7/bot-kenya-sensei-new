const {addReport} = require("../model/dbReport");
const {readSnipemsg, removeSnipemsg} = require("../model/dbMessage");
const { MessageEmbed } = require("discord.js");
const firebase = require("../db/firebaseConfig");

module.exports.run = async(client, message, args) => {
    try {
       let ch = message.channel.id; 
       var input = args[0];
       let cmd = message.content.split(': ');
       var user = client.users.cache.get(input) || client.users.cache.find(x => x.username == input) || message.guild.members.cache.get(input)?.user || message.mentions.users.first() || message.author;
       
        try {
            readSnipemsg((data) => {
                Object.keys(data).map((key) =>{
                    let dbUser = data[key].author;
                    let chid = data[key].channelid;
                    let dbUserid = data[key].authorid;
                    
                    if(user.tag === dbUser && ch === chid){
                        if(cmd[1] === "delete"){
                          removeSnipemsg(dbUserid);
                          message.reply(`Pesan Tercyduk ${user.tag} telah dihapus XD`).then(msg => msg.delete({timeout: 10000}))
                        } else {
                          const msgembed = new MessageEmbed()
                          .setAuthor(dbUser, user.displayAvatarURL())
                          .setDescription(data[key].content)
                          .setFooter(`Pesan Terciduk Nak XD | ${data[key].datetime}`)
                          return message.channel.send(msgembed).then(msg => { msg.delete({timeout: 10000}) });
                        }
                    } else;
                })
            })
        } catch (e) {
            console.log(e);
            addReport(`Bot-Error`, `snipe.ts Error: ${e}`);
        }

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
