const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
  try {
  const channel = message.member.voice.channel;
  if (!channel){
    
    return message.channel.send(
      "KAMU HARUS JOIN CHANNEL DULU NAK!"
    ).then(message => message.delete({timeout: 10000}));}

  const queue = message.client.queue.get(message.guild.id);
  var status;
  var np;
  var thumbnail;
  var count = 0;
  if (!queue) status = "There is nothing in queue!";
  else
    status = queue.queue
      .map((x) => {
        count += 1;
        return (
          "• " +
          "`" +
          count +
          "." +
          "`" +
          x.name +
          " -Requested by " +
          `<@${x.requested.id}>`
        );
      })
      .join("\n");
  if (!queue) np = status;
  else np = queue.queue[0].name;
  if (queue) thumbnail = queue.queue[0].thumbnail;
  else thumbnail = message.guild.iconURL();

  const filter = (reaction, user) => {
            return [`❎`].includes(reaction.emoji.name) && user.id === message.author.id;
        };

  message.channel.send(
  new MessageEmbed()
      .setAuthor(
        "Music Queue",
        "https://img.icons8.com/color/2x/rhombus-loader.gif"
      )
      .setThumbnail(thumbnail)
      .setColor("GREEN")
      .addField("Now Playing", np, true)
      .setDescription(status)
  ).then(embedMessage => {
            embedMessage.react(`❎`);
            embedMessage.awaitReactions(filter, { max: 1}).then(collected =>{
                const reaction = collected.first();

                if (reaction.emoji.name === `❎`){
                    embedMessage.delete({timeout: 5000});
                }
            }).catch(collected => {console.log("error")});
        });
     } catch(e){
        console.log(e);
     }
};
