const { MessageEmbed } = require("discord.js");
const model = require("../model");

exports.run = async (client, message) => {
  try {
    message.channel.send(
      new MessageEmbed()
        .setAuthor(
          "Invite Me",
          "https://img.icons8.com/ultraviolet/2x/email-open--v2.gif"
        )
        .setColor("BLUE")
        .setTimestamp()
        .setDescription(
          "https://discord.com/oauth2/authorize?client_id=" +
            client.user.id +
            "&permissions=" +
            "37080128" +
            "&scope=" +
            "bot"
        )
    );
  } catch (error) {
    console.log(error);
    model.addReport(`Bot-Error`, `invite Error: ${error}`);
  }
};
