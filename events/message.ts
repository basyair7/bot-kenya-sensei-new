const { MessageEmbed } = require("discord.js");
const { addReport } = require("../model/dbReport");
const firebase = require('../db/firebaseConfig');
const { getQNA } = require("../model/dbMessage");
const { removeData, readId } = require('../model/dbAfk');
//const db = require('quick.db');

module.exports = async (client, message) => {
    try {
        programAfk(client, message);

        // command not ks
        let notks = message.content.toLowerCase();

        // Check in Database
        getQNA((data) => {
            Object.keys(data).map((key) => {
                let answer = '';
                if (notks === data[key].q) {
                    answer = data[key].a;
                }

                
                if (answer === ":ping_pong: Pong!")
                {
                    var ping = Date.now() - message.createdTimestamp;
                    message.reply(`:ping_pong: Pong! ${ping}ms`);
                }
                else if (answer === "seperti ini nak caranya..")
                {
                    message.reply("seperti ini nak caranya..",{files:['./images/1556546505120.jpg']});
                }
                else if (answer === "Astaghfirullah, jarimu kasar nak") 
                {
                    message.reply("Astaghfirullah, jarimu kasar nak", {files:['./images/STK-20220129-WA0210.webp']});
                }
                else if (answer === "Hallo nak.. :slight_smile:")
                {
                    message.reply("Hallo nak.. :slight_smile:", {files:['./images/STK-20220129-WA0213.webp']});
                } 
                else if (answer === "bajul")
                {
                    message.reply({files:['./images/2234132402.jpg']});
                }
                else {
                    if (answer) {
                        message.reply(`${answer}`);
                    } else;
                };
            });

            

        });

        // prefix commands
        if (message.author.bot) return;

        if (message.content.toLowerCase().indexOf(client.config.prefix) !== 0) return;
        
        const args = message.content
            .slice(client.config.prefix.length)
            .trim()
            .split(/ +/g);
        const command = args.shift().toLowerCase();

        const cmd = client.commands.get(command);

        if (!cmd) return;

        cmd.run(client, message, args);
        
    } catch (e) {
        addReport(`Bot-Error`, `message.ts Error: ${e}`);
        console.log(e);
    }

};

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

    /*
    if(db.has(`afk-${message.author.id}+${message.guild.id}`)) {
        const info = db.get(`afk-${message.author.id}+${message.guild.id}`)
        await db.delete(`afk-${message.author.id}+${message.guild.id}`)
        message.reply(`Your afk status have been removed (${info})`)
    }
    //checking for mentions
    if(message.mentions.members.first()) {
        if(db.has(`afk-${message.mentions.members.first().id}+${message.guild.id}`)) {
            const image = message.mentions.users.first()
            let description = message.mentions.members.first().user.tag + " : " + db.get(`afk-${message.mentions.members.first().id}+${message.guild.id}`)
            let msg = new MessageEmbed()
                .setTitle("Info Anggota AFK")
                .setThumbnail(image.displayAvatarURL())
                .setDescription(description)
            message.reply(msg)
        }else return;
    }else;
    */
}
