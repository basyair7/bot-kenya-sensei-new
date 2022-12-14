const { 
    addReport, 
    addSnipemsg
} = require("../model");
const clock = require("../utils");

module.exports = async (client, message) => {
    try {
        if (message.author.bot) return;
       
        addSnipemsg(
            clock.DateTimeBot(),
            message.content,
            message.author.tag,
            message.author.id,
            message.channel.id
        )

        /*
        client.snipes.set(message.channel.id, {
            content: message.content,
            author: message.author.tag,
            member: message.member,
            image: message.attachments.first() ? message.attachments.first().proxyURL : null
        })
        */
        
        
    } catch (e) {
        console.log(e);
        addReport(`Bot-Error`, `messageDelete Error: ${e}`);
    }
}
