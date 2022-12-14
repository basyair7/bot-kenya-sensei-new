const model = require("../model");

exports.run = async(client, message, args) => {
    try {
        let say = args.join(' ')
        message.channel.send(say)
    } catch (e) {
        console.log(e);
        model.addReport(`Bot-Error`, `says Error: ${e}`);        
    }    
}
