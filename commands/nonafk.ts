const firebase = require('../db/firebaseConfig');
const { removeData } = require('../model/dbModel');

module.exports = {
    name: 'noafk',
    run: async(client, message, args) => {
        let idMember = `afk-${message.author.id}and${message.guild.id}`;
        firebase.ref('/afk/'+idMember+'/id/').once('value', function (snapshot) {
            const id = snapshot.val();
            if (id !== null) {
                if (idMember === id){
                    firebase.ref('/afk/'+idMember+'/reason/').once('value', 
                    (SnapShot) => {
                        var reason = SnapShot.val()
                            if (reason !== null) {
                                message.reply(`Selamat Datang nak... Kamu telah kembali dari (${reason})`).then(msg => msg.delete({ timeout: 10000 }))
                                removeData(idMember)
                            } else;
                    })
                }
            }
        })
    }
}
