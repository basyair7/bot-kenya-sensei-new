const { MessageEmbed } = require("discord.js");
const {addReport} = require("../model/dbReport");

module.exports = {
    name: 'send ch',
    run: async(client, message, args) => {
        try{
            let ch;
            const ch01 = "798157102249541684";
            const ch02 = "854379430963970058";
            const ch03 = "798163730982502400";
            const ch04 = "821917495479894036";
            const ch05 = "944559480866209862";
            const ch06 = "944560611327623188";
            const ch00 = "929327327219957821";
            let selection = message.content.split(': ');
            let cmd = args[0].toLowerCase();
            
            if(cmd === "info"){
                const list = `ch01\`\` => perbincangan-makhluk-intropet,
                ch02\`\` => jastip-coolyeah,
                ch03\`\` => request-music,
                ch04\`\` => coolyeah-room2-,
                ch05\`\` => genshin-impact,
                ch06\`\` => moontod,
                ch00\`\` => general`;

                const filter = (reaction, user) => {
                      return [`❎`].includes(reaction.emoji.name) && user.id === message.author.id;
                };

                const revisedList = list
                                .split('\n')
                                .map((x) => "• " + "``" + client.config.prefix + "sendch " + x.trim())
                                .join('\n');

                const view_msg = new MessageEmbed()
                        .setTitle("Info Send Message to Channel")
                        .setDescription("<ks.sendch ch01 : test message>")
                        .addField("List Channel", revisedList)

                return message.channel.send(view_msg).then(embedMessage => {
                       embedMessage.react(`❎`);
                       embedMessage.awaitReactions(filter, { max: 1 }).then(collected =>{
                           const reaction = collected.first();

                           if (reaction.emoji.name === `❎`){
                               embedMessage.delete({timeout: 5000});
                           }
                       }).catch(collected => {console.log("Error")});
                });
            }
            else if(cmd === "ch01"){
               ch = client.channels.cache.find(channel => channel.id === ch01);
               return ch.send(selection[1])              
            }
            else if(cmd === "ch02"){
               ch = client.channels.cache.find(channel => channel.id === ch02);
               return ch.send(selection[1])
            }
            else if(cmd === "ch03"){
               ch = client.channels.cache.find(channel => channel.id === ch03);
               return ch.send(selection[1])
            }
            else if(cmd === "ch04"){
               ch = client.channels.cache.find(channel => channel.id === ch04);
               return ch.send(selection[1])
            }
            else if(cmd === "ch00"){
               ch = client.channels.cache.find(channel => channel.id === ch00);
               return ch.send(selection[1])
            }
            else if(cmd === "ch05"){
               ch = client.channels.cache.find(channel => channel.id === ch05);
               return ch.send(selection[1])
            }
            else if(cmd === "ch06"){
               ch = client.channels.cache.find(channel => channel.id === ch06);
               return ch.send(selection[1])
            }
            else{
              //TODO
            }
            
        } catch(e){
            console.log(e);
            addReport(`Bot-Error`, `sendch.ts Error: ${e}`);
        }
    }
}
