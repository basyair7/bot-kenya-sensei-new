const { MessageEmbed } = require("discord.js");

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
            let selection = message.content.split(', ');
            
            if(args[0] === "info"){
                const list = `ch01\`\` => perbincangan-makhluk-intropet,
                ch02\`\` => jastip-coolyeah,
                ch03\`\` => request-music,
                ch04\`\` => coolyeah,
                ch05\`\` => genshin-impact,
                ch06\`\` => moontod,
                ch00\`\` => general`;

                const revisedList = list
                                .split('\n')
                                .map((x) => "• " + "``" + client.config.prefix + x.trim())
                                .join('\n');

                return message.channel.send(new MessageEmbed()
                                     .setTitle("Info Send Message to Channel")
                                     .setDescription("<ks.sendch ch01 , test message>")
                                     .addField("List Channel", revisedList)
                                     );
            }
            else if(args[0] === "ch01"){
               ch = client.channels.cache.find(channel => channel.id === ch01);
               return ch.send(selection[1])              
            }
            else if(args[0] === "ch02"){
               ch = client.channels.cache.find(channel => channel.id === ch02);
               return ch.send(selection[1])
            }
            else if(args[0] === "ch03"){
               ch = client.channels.cache.find(channel => channel.id === ch03);
               return ch.send(selection[1])
            }
            else if(args[0] === "ch04"){
               ch = client.channels.cache.find(channel => channel.id === ch04);
               return ch.send(selection[1])
            }
            else if(args[0] === "ch00"){
               ch = client.channels.cache.find(channel => channel.id === ch00);
               return ch.send(selection[1])
            }
            else if(args[0] === "ch05"){
               ch = client.channels.cache.find(channel => channel.id === ch05);
               return ch.send(selection[1])
            }
            else if(args[0] === "ch06"){
               ch = client.channels.cache.find(channel => channel.id === ch06);
               return ch.send(selection[1])
            }
            
            
        } catch(e){
            console.log(e)
        }
    }
}
