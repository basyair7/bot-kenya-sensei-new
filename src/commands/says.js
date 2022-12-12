const { addReport } = require("../model");

exports.run = async(client, message, args) => {
    try {
        let say = args.join(' ')
        message.channel.send(say)
    } catch (e) {
        console.log(e);
        addReport(`Bot-Error`, `says.ts Error: ${e}`);        
    }    
}
