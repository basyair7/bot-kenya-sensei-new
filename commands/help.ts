const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
  const listHelp = `ping\`\` => cek kecepatan internet, 
  says (ks.says pesan)\`\` => perintah mengirimkan ulang pesan ke bot, 
  servericon\`\` => menampilkan gambar icon server, 
  mukaku (ks.mukaku atau ks.mukaku @tag)\`\` => menampilkan gambar avatar member,
  stats\`\`=> status bot, 
  uptime\`\`=> waktu start bot, 
  clear\`\`=> membersihkan pesan channel, 
  sendch \`\` => perintah bot mengirimkan ulang pesan ke channel lain,
  afk (ks.afk reason)\`\`=> perintah mengaktifkan afk, 
  nonafk\`\`=> menonaktifkan afk,
  restart\`\`=> restart ulang bot`;

  const cmd1 = '`indonesia`, `ping`, `bajul`, `hmm/hm`, `iya buk`, `yaa buk`, `y`, `iya buk`, `ya buk`, `iyaa buk`';
  const cmd2 = '`gak mau buk`, `engga mau buk`, `ga mau buk`, `gak mau`, `halo`, `hallo`, `alo`, `hello`, `helo`';
  const cmd3 = '`p`, `assalamualaikum`, `assalamualaikum warahmatullahi wabarakatuh`';
  const cmd4 = '`buk kenya, gimana cara kita cepat lulus sekolah?`, `sensei, gimana cara cepat lulus sekolah?`, `curhat dong sensei`, `buk kenya, curhat dong`';
  const cmd5 = '`ngakak`, `ohayou!`, `ohayou`, `oha`, `konnichiwa`, `konbanwa`, `anyeonghaseo`';
  const cmd6 = '`diam`, `diam!`, `diem lu`, `diem`, `diem lo`, `nugas`, `belajar`, `ada tugas`, `mau belajar`, `mau bljr`, `bljr`';

  const revisedHelp = listHelp
    .split('\n')
    .map((x) => "• " + "``" + client.config.prefix + x.trim())
    .join('\n');

  const commands = `connect\`\` - join the voice channel you are in
   disconnect\`\` - leave the voice channel you are in
   play <Song Name or url>\`\` - play songs from youtube
   pause\`\` - pause currently playing songs in the server
   resume\`\` - resume paused songs in the server
   queue\`\` - shows the song queue of the server
   skip\`\` - skips to next song in the queue
   skipto <Target number>\`\` - Multiple skips until target
   stop\`\` - stops the song and clears the queue
   volume <volume count or none>\`\` - see or adjust volume of songs
   np\`\` - see now playing song
   lyrics\`\` - get lyrics of current song
   shuffle\`\` - shuffle and randomize the queue
   invite\`\` - get invite link for the bot
   loop\`\` - enable / disable loop for the currently playing song
   remove <Target number>\`\` - remove a song from the queue`;

  const revised = commands
    .split("\n")
    .map((x) => "• " + "``" + client.config.prefix + x.trim())
    .join("\n");

  const filter = (reaction, user) => {
            return [`❎`].includes(reaction.emoji.name) && user.id === message.author.id;
        };

  message.channel.send(
    new MessageEmbed()
      .setTitle("Kenya-sensei Commands Help")
      .setColor("RANDOM")
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp()
      .addField("Core", revisedHelp)
      .addField("Music Commands", revised)
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
