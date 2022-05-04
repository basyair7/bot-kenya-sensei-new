const { MessageEmbed } = require("discord.js");
const { addReport } = require("../model/dbReport");

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
    addReport(`Bot-Error`, `invite.ts Error: ${error}`);
  }
};
