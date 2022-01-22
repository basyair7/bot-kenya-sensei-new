const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
  const listHelp = `ping\`\` => cek kecepatan internet, 
  says\`\` => perintah mengirimkan ulang pesan ke bot (ks.says pesan), 
  servericon\`\` => menampilkan gambar icon server, 
  stats\`\`=> status bot, 
  uptime\`\`=> waktu start bot, 
  clear\`\`=> membersihkan pesan channel, 
  afk\`\`=> perintah mengaktifkan afk (ks.afk reason), 
  nonafk\`\`=> menonaktifkan afk`;

  const cmd1 = '`indonesia`, `ping`, `bajul`, `hmm/hm`, `iya buk`, `yaa buk`, `y`, `iya buk`, `ya buk`, `iyaa buk`';
  const cmd2 = '`gak mau buk`, `engga mau buk`, `ga mau buk`, `gak mau`, `halo`, `hallo`, `alo`, `hello`, `helo`';
  const cmd3 = '`p`, `assalamualaikum`, `assalamualaikum warahmatullahi wabarakatuh`';
  const cmd4 = '`buk kenya, gimana cara kita cepat lulus sekolah?`, `sensei, gimana cara cepat lulus sekolah?`, `curhat dong sensei`, `buk kenya, curhat dong`';
  const cmd5 = '`ngakak`, `ohayou!`, `ohayou`, `oha`, `konnichiwa`, `konbanwa`, `anyeonghaseo`';
  const cmd6 = '`diam`, `diam!`, `diem lu`, `diem`, `diem lo`, `nugas`, `belajar`, `ada tugas`, `mau belajar`, `mau bljr`, `bljr`';

  const commands = `connect\`\`, disconnect\`\`, play <Song Name or url>\`\`, pause\`\`, resume\`\`, queue\`\`, skip\`\`, skipto <Target number>\`\`, stop\`\`, `+
   `volume <volume count or none>\`\`, np\`\`, lyrics\`\`, shuffle\`\`, invite\`\`, loop\`\`, remove <Target number>\`\`,`;

  const revised = commands
    .split(", ")
    .map((x) =>"``" + client.config.prefix + x.trim())
    .join(", ");
  
  const revisedHelp = listHelp
    .split('\n')
    .map((x) => "• " + "``" + client.config.prefix + x.trim())
    .join('\n ');

  const filter = (reaction, user) => {
            return [`❎`].includes(reaction.emoji.name) && user.id === message.author.id;
        };

  message.channel.send(
    new MessageEmbed()
      .setTitle("Kenya-sensei Commands Help")
      .setColor("RANDOM")
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp()
      .addField("Core", revisedHelp, true)
      .addField("Music Commands", revised, true)
      .addField("Commands 1", cmd1, true)
      .addField("Commands 2", cmd2, true)
      .addField("Commands 3", cmd3, true)
      .addField("Commands 4", cmd4, true)
      .addField("Commands 5", cmd5, true)
      .addField("Commands 6", cmd6, true)
  ).then(embedMessage => {
            embedMessage.react(`❎`);
            embedMessage.awaitReactions(filter, { max: 1}).then(collected =>{
                const reaction = collected.first();

                if (reaction.emoji.name === `❎`){
                    embedMessage.delete({timeout: 5000});
                }
            }).catch(collected => {console.log("error")});
        });
};
