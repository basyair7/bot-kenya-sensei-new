const { MessageEmbed } = require("discord.js");
const superagent = require("superagent");

exports.run = async(client, message, args) => {
    try {
        let query = args.join(" ")
        if (!query) return message.channel.send("No Query.");

        let result = await superagent.get("https://customsearch.googleapis.com/customsearch/v1").query({
            q: query,
            cx: "fabc838188055482f",
            key: "AIzaSyBzYYTqN_X90RKqQfJtXbr43m8sVn3UcvM"
        });

        if (!result.body.items) return message.reply("Tidak Ditemukan. ");
        if (result.status >= 400) return message.channel.send("Error. ").then(console.log(result.message));

        let res = result.body.items[0];
        const embed = new MessageEmbed()
        .setColor(0x7289)
        .setTitle(res.title)
        .setDescription(res.snippet)
        .setURL(res.link)
        .setImage(res.pagemap.cse_image[0].src || res.pagemap.cse_thumbnail[0].src);
        return message.reply(embed);
    } catch (error) {
        console.log(error);
    }
}
