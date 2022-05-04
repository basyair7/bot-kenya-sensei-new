//requiring the package
//const db = require('quick.db');
const { MessageEmbed } = require('discord.js');
const { addData } = require('../model/dbModel');
const { addReport } = require("../model/dbReport");

module.exports = {
    name: 'afk',
    run: async(client, message, args) => {
        try {
            const content = args.join(' ');
            const embed = new MessageEmbed()
            .setDescription(`You have been set to afk\n**Reason :** ${content}`)
            .setColor("RANDOM")
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic : true }))
            message.channel.send(embed).then(msg => msg.delete({timeout: 10000}))
            return addData(`afk-${message.author.id}and${message.guild.id}`, content)
        } catch (error) {
            addReport(`Bot-Error`, `afk.ts Error: ${error}`);
            console.log(error);
        }
    }
}

/*
module.exports = {
    name : 'afk',
    run : async(client, message, args) => {
        const content = args.join(" ")
        await db.set(`afk-${message.author.id}+${message.guild.id}`, content)
        const embed = new MessageEmbed()
        .setDescription(`You have been set to afk\n**Reason :** ${content}`)
        .setColor("GREEN")
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic : true }))
        message.channel.send(embed)                
    }
}
*/
