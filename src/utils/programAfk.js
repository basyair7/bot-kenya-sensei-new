const firebase = require('../database');
const { removeData } = require("../model");
const { MessageEmbed } = require("discord.js");

function programAfk(client, message){
    const argAfk = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(/ +/g);
    const msgAfk = argAfk.shift().toLowerCase();

    if (msgAfk !== "afk"){
        firebase.ref(`/afk/afk-${message.author.id}and${message.guild.id}`).once('value').then((snapshot) => {
            var idMember = snapshot.val();
            if (idMember !== null)
            {
                if (idMember.id === `afk-${message.author.id}and${message.guild.id}`) {
                    firebase.ref(`/afk/${`afk-${message.author.id}and${message.guild.id}`}/reason/`).once('value').then(async (snapshot) => {
                        var reason = snapshot.val();
                        if (reason !== null)
                        {
                            message.reply(`Selamat Datang nak... Kamu telah kembali dari (${reason})`).then(msg => msg.delete({ timeout: 10000 }))
                            removeData(`afk-${message.author.id}and${message.guild.id}`)
                        } else;
                    })
                } else return;
            } else;
        })
    }
    
    if(message.mentions.members.first()) {
        let id = `afk-${message.mentions.members.first().id}and${message.guild.id}`;
        firebase.ref(`/afk/${id}/id/`).once('value', function (snapshot) {
            var data = snapshot.val()
            if(data !== null)
            {
                if(data === id)
                {
                    firebase.ref(`/afk/${id}/reason/`).once('value', function(SnapShot) {
                        var msgReason = SnapShot.val()
                        if(msgReason !== null)
                        {
                            const image = message.mentions.users.first()
                            let description = message.mentions.members.first().user.tag + " : " + msgReason
                            let msg = new MessageEmbed()
                                .setTitle("Info Anggota AFK")
                                .setThumbnail(image.displayAvatarURL())
                                .setDescription(description)
                            message.reply(msg).then(m => m.delete({timeout: 12000}))
                        
                        } else;
                    })
                } else return;
            } else;
        })
    } else;
}

module.exports = programAfk;