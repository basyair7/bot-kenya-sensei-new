const { MessageEmbed } = require("discord.js");
const {addReport} = require("../model/dbReport");
const lyricsFinder = require("lyrics-finder");

exports.run = async (client, message, args) => {
  try {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue)
      return message.channel
        .send("There is nothing playing.")
        .then(message => message.delete({timeout: 10000}))
        .catch(console.error);

    let lyrics = null;

    try {
      lyrics = await lyricsFinder(queue.queue[0].name, "");
      if (!lyrics) lyrics = `No lyrics found for ${queue.queue[0].name} :x:`;
    } catch (error) {
      lyrics = `No lyrics found for ${queue.queue[0].name} :x:`;
    }
    const filter = (reaction, user) => {
              return [`❎`].includes(reaction.emoji.name) && user.id === message.author.id;
          };

    let lyricsEmbed = new MessageEmbed()
      .setAuthor(
        `Lyrics For ${queue.queue[0].name}`,
        "https://img.icons8.com/color/2x/task--v2.gif"
      )
      .setDescription(lyrics)
      .setColor("BLUE")
      .setTimestamp();

    if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
    return message.channel.send(lyricsEmbed).then(embedMessage => {
              embedMessage.react(`❎`);
              embedMessage.awaitReactions(filter, { max: 1}).then(collected =>{
                  const reaction = collected.first();

                  if (reaction.emoji.name === `❎`){
                      embedMessage.delete({timeout: 5000});
                  }
              }).catch(collected => {console.log("error")});
          }).catch(console.error);
  } catch (e) {
    console.log(e);
    addReport(`Bot-Error`, `lyrics.ts Error: ${e}`);
  }
};
