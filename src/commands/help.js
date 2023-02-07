const { MessageEmbed } = require("discord.js");
const model = require("../model");

exports.run = async (client, message) => {
  try {
    const listHelp = `ping\`\` => cek kecepatan internet, 
    says (ks.says pesan)\`\` => perintah mengirimkan ulang pesan ke bot, 
    servericon\`\` => menampilkan gambar icon server, 
    mukaku (ks.mukaku atau ks.mukaku @tag)\`\` => menampilkan gambar avatar member,
    stats\`\`=> status bot, 
    uptime\`\`=> waktu start bot, 
    clear\`\`=> membersihkan pesan channel, 
    sendch (ks.sendch info) \`\` => perintah bot mengirimkan ulang pesan ke channel lain,
    afk (ks.afk reason)\`\`=> perintah mengaktifkan afk, 
    nonafk\`\`=> menonaktifkan afk,
    restart\`\`=> restart ulang bot,
    google\`\`=> mesin pencarian google (ks.google halo)
    snipe\`\` => menampilkan pesan member yang dihapus`;

    const cmd1 = '•>`indonesia`\n•>`ping`\n•>`bajul`\n•>`hmm/hm`\n•>`iya buk`\n•>`yaa buk`\n•>`y`\n•>`iya buk`\n•>`ya buk`\n•>`iyaa buk`';
    const cmd2 = '•>`gak mau buk`\n•>`engga mau buk`\n•>`ga mau buk`\n•>`gak mau`\n•>`halo`\n•>`hallo`\n•>`alo`\n•>`hello`\n•>`helo`';
    const cmd3 = '•>`p`\n•>`assalamualaikum`\n•>`assalamualaikum warahmatullahi wabarakatuh`';
    const cmd4 = '•>`buk kenya, gimana cara kita cepat lulus sekolah?`\n•>`sensei, gimana cara cepat lulus sekolah?`\n•>`curhat dong sensei`\n•>`buk kenya, curhat dong`';
    const cmd5 = '•>`ngakak`\n•>`ohayou!`\n•>`ohayou`\n•>`oha`\n•>`konnichiwa`\n•>`konbanwa`\n•>`anyeonghaseo`';
    const cmd6 = '•>`diam`\n•>`diam!`\n•>`diem lu`\n•>`diem`\n•>`diem lo`\n•>`nugas`\n•>`belajar`\n•>`ada tugas`\n•>`mau belajar`\n•>`mau bljr`\n•>`bljr`';

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
    remove <Target number>\`\` - remove a song from the queue
    lofi <ks.lofi help>\`\` - Play lofi hip hop radio 24/7`;

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
      embedMessage.awaitReactions(filter, { max: 1 }).then(collected => {
        const reaction = collected.first();

        if (reaction.emoji.name === `❎`) {
          embedMessage.delete({ timeout: 5000 });
        }
      }).catch(collected => { console.log("error") });
    });
  } catch (error) {
    console.log(error);
    model.addReport(`Bot-Error`, `help Error: ${error}`);
  }
};
