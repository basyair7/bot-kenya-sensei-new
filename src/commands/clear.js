const model = require('../model');

module.exports = {
    name : 'clear',
    aliases : ['purge'],
    run : async(client, message, args) => {
        try {
            if(!args[0]) return message.channel.send('Please specify a number of messages to delete ranging from 1 - 99').then(msg => msg.delete({timeout: 10000}));
            if(isNaN(args[0])) return message.channel.send('Numbers are only allowed').then(msg => msg.delete({timeout: 10000}));
            if(parseInt(args[0]) > 99) return message.channel.send('The max amount of messages that I can delete is 99').then(msg => msg.delete({timeout: 5000}));
            await message.channel.bulkDelete(parseInt(args[0]) + 1, true).catch(err => console.log(err))
            message.channel.send('Deleted ' + args[0]  + " messages.").then(msg => msg.delete({timeout: 5000}));
        } catch (err) {
            console.log(err);
            model.addReport(`Bot-Error`, `clear Error: ${err}`);
        }
    }
}
