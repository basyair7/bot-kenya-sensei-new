const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
  let command_ks = new MessageEmbed()
    .setTitle("kenya-sensei Commands Help")
    .setDescription("Commands ks.")
    .setColor("RANDOM")
    .setThumbnail(client.user.displayAvatarURL())
    .addField("Core",
    '`help`, `ping`, `says`, `servericon`, `stats`, `uptime`, `clear`', true);

    let command_not_ks = new MessageEmbed()
    .setTitle("kenya-sensei Commands Help")
    .setDescription("Command Not ks.")
    .setColor("RANDOM")
    .setThumbnail(client.user.displayAvatarURL())
    .addField("Commands 1",
    '`indonesia`, `ping`, `bajul`, `hmm/hm`, `iya buk`, `yaa buk`, `y`, `iya buk`, `ya buk`, `iyaa buk`', true)
    .addField("Commands 2",
    '`gak mau buk`, `engga mau buk`, `ga mau buk`, `gak mau`, `halo`, `hallo`, `alo`, `hello`, `helo`', true)
    .addField("Commands 3",
    '`p`, `assalamualaikum`, `assalamualaikum warahmatullahi wabarakatuh`', true)
    .addField("Commands 4",
    '`buk kenya, gimana cara kita cepat lulus sekolah?`, `sensei, gimana cara cepat lulus sekolah?`, `curhat dong sensei`, `buk kenya, curhat dong`', true)
    .addField("Commands 5",
    '`ngakak`, `ohayou!`, `ohayou`, `oha`, `konnichiwa`, `konbanwa`, `anyeonghaseo`', true)
    .addField("Commands 6",
    '`diam`, `diam!`, `diem lu`, `diem`, `diem lo`, `nugas`, `belajar`, `ada tugas`, `mau belajar`, `mau bljr`, `bljr`', true);

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

  const message_command_ks = await message.channel.send(command_ks)
  const message_command_not_ks = await message.channel.send(command_not_ks)

  message.channel.send(
    new MessageEmbed()
      .setTitle("Kenya-sensei Music Commands Help")
      .setDescription("Command Not ks?")
      .setColor("RANDOM")
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp()
      .setDescription(revised)
  ).then(embedMessage => {
            embedMessage.react(`❎`);
            embedMessage.awaitReactions(filter, { max: 1}).then(collected =>{
                const reaction = collected.first();

                if (reaction.emoji.name === `❎`){
                    embedMessage.delete({timeout: 5000});
                    message_command_ks.delete({timeout: 5000});
                    message_command_not_ks.delete({timeout: 5000});
                }
            }).catch(collected => {console.log("error")});
        });
};
