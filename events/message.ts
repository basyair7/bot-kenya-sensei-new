const db = require('quick.db');

module.exports = async (client, message) => {
    if(db.has(`afk-${message.author.id}+${message.guild.id}`)) {
        const info = db.get(`afk-${message.author.id}+${message.guild.id}`)
        await db.delete(`afk-${message.author.id}+${message.guild.id}`)
        message.reply(`Your afk status have been removed (${info})`)
    }
    //checking for mentions
    if(message.mentions.members.first()) {
        if(db.has(`afk-${message.mentions.members.first().id}+${message.guild.id}`)) {
            message.channel.send(message.mentions.members.first().user.tag + ":" + db.get(`afk-${message.mentions.members.first().id}+${message.guild.id}`))
        }else return;
    }else;

    // command not ks
    let notks = message.content.toLowerCase();
    if (notks === "help"){
        message.channel.send("ks?help").then(msg => msg.delete({timeout: 3000}));
    }

    else if (notks === "indonesia") {
        message.reply(":flag_id:");
    }
    
    else if(notks === "hm" || notks === "hmm"){
        message.reply(" hamm hemm... hamm hemm doang.. sini ramein :v");
    }

    else if(notks === "iya buk" || notks === "yaa buk" || notks === "iya bu" || notks === "ya buk" 
            || notks === "iyaa buk"){
            
            message.reply(" Iya doang.. ulangi salam dulu");
    }

    else if(notks === "y"){
        message.reply("Y doang nak, sok cool XD")
    }

    else if(notks === "gak mau buk" || notks === "engga mau buk" || notks === "ga mau buk" || notks === "gak mau"){
        message.reply(` ini anak tidak mau didengar yaa... sensei pukul :angry:`);
    }

    else if(notks === "halo" || notks === "hallo" || notks === "alo" || notks === "hello" || notks === "helo"){
        message.reply("Hallo nak.. :slight_smile:");
    }

    else if(notks === "ping"){
        var ping = Date.now() - message.createdTimestamp;
        message.reply(`:ping_pong: Pong! ${ping}ms`);
        //message.reply(`:ping_pong: Pong! ${client.ws.ping}ms`);
        /*
        message.reply(':ping_pong: Pong!').then(m => {
            var ping = m.createdTimestamp - notks.createdTimestamp;
            
            m.edit(`:ping_pong: Pong! ${ping}ms`);
        });
        */
    
    }

    else if(notks === "p"){
        message.reply("biasakan salam nak...");
    }

    else if(notks === "assalamualaikum" || notks === "assalamu'alaikum"){
        message.reply("waalaikumsalam");
    }

    else if(notks === "assalamualaikum warahmatullahi wabarakatuh" 
            || notks === "assalamu'alaikum warahmatullahi wabarakatuh"){
            
            message.reply("wa'alaikumsalam warahmatullahi wabarakatuh");
    } 
    
    else if(notks === "ajg" || notks === "babi" || notks === "anjg" || notks ==="anjing" || notks === "njing" 
            || notks === "asu" || notks === "bbi" || notks === "njg" || notks === "anj" || notks === "asw" 
            || notks === "bgsd" || notks === "bangsat" || notks === "bgst"){
            
            message.reply("Astaghfirullah, jarimu kasar nak");
    }

    else if(notks === "buk kenya, gimana cara kita cepat lulus sekolah?" || notks === "sensei, gimana cara cepat lulus sekolah?"){
        message.reply("seperti ini nak caranya..",{files:['./images/1556546505120.jpg']});
    }
    
    else if(notks === "curhat dong sensei" || notks === "buk kenya, curhat dong"){
        message.reply("iya nakkkk!!! XD");
        message.channel.send("Tidak menerima murid goblog murid sensei semua harus pintar");
    }
    
    else if(notks === "ngakak"){
        message.reply(`ngakak mulu anak setan! :unamused:`);
    }
    
    else if(notks === "ohayou!" || notks === "ohayou" || notks === "oha" || notks === "konnichiwa" 
            || notks === "konbanwa"){
            
            message.reply("wibu lu");
            message.channel.send(`awas! ada wibu :joy: *canda wibu`);
    }

    else if(notks === "anyeonghaseo"){
        message.reply("sasaeng laknat!");
    }

    else if(notks === "diam" || notks === "diam!" || notks === "diem lu" || notks === "diem" || notks === "diem lo"
            || notks === "diam lu" || notks === "diam lo"){
            
            message.reply(`serah gua yeh, kalo ga terima lu keluar sekarang! :smirk: :leg:`);
    }

    else if(notks === "nugas"|| notks === "belajar" || notks === "ada tugas" || notks === "mau belajar" || notks === "mau bljr" || notks === "bljr"){
        message.reply("semangat nugasnya, ingat masa depan anda suram nak ♡ :smiling_face_with_3_hearts:");
    }
    
    else if(notks === "bajul"){
        message.reply({files:['./images/2234132402.jpg']});
    } 

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

};
