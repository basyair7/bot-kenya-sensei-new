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
            const ch05 = "929327327219957821";
            const chname01 = client.channels.cache.find(ch01)
            const chname02 = client.channels.cache.find(ch02)
            const chname03 = client.channels.cache.find(ch03)
            const chname04 = client.channels.cache.find(ch04)
            const chname05 = client.channels.cache.find(ch05)
            let selection = message.content.split(' | ');
            if(args[0] === "info"){
                const list = `ch01\`\` => perbincangan-makhluk-intropet,
                ch02\`\` => jastip-coolyeah,
                ch03\`\` => request-music,
                ch04\`\` => coolyeah,
                ch05\`\` => ${chname05.name}`;
                
                const revisedList = list
                                .split('\n')
                                .map((x) => "• " + "``" + client.config.prefix + x.trim())
                                .join('\n');
                
                message.channel.send(new MessageEmbed()
                                     .setTitle("Info Send Message to Channel")
                                     .setDescription("<ks.sendch ch01 | message>")
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
            else if(args[0] === "ch05"){
               ch = client.channels.cache.find(channel => channel.id === ch05);
               return ch.send(selection[1])
            }
        } catch(e){
            console.log(e)
        }
    }
}
