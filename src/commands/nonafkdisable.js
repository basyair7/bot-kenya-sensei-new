const firebase = require('../database');
const { removeData, addReport } = require('../model');

module.exports = {
    name: 'nonafk',
    run: async(client, message, args) => {
        try{
            let idMember = `afk-${message.author.id}and${message.guild.id}`;
            firebase.ref('/afk/'+idMember+'/id/').once('value').then(async function (snapshot) {
                const id = snapshot.val();
                if (id !== null) 
                {
                    if (idMember === id)
                    {
                        firebase.ref('/afk/'+idMember+'/reason/').once('value', 
                        (SnapShot) => {
                            var reason = SnapShot.val()
                                if (reason !== null) 
                                {
                                    message.reply(`Selamat Datang nak... Kamu telah kembali dari (${reason})`).then(msg => msg.delete({ timeout: 10000 }))
                                    removeData(idMember)
                                } else;
                        })
                    } else return;
                } else;
            })
        } catch(e){
            console.log(e);
            addReport(`Bot-Error`, `nonafk Error: ${e}`);
        }
    }
}
