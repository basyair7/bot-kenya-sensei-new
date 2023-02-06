const { MessageEmbed } = require("discord.js");
const { platform, arch, cpus } = require("os");
const db = require("../model");
const clock = require("../utils");

module.exports = async (client) => {
  try {
    console.log("[Discord API]: Logged In As " + client.user.tag);
    console.log(`${client.user.tag} sudah online!`);
    const model = cpus()[0].model + " " + arch();
    client.user.setUsername(`Kenya-sensei 「 ${client.config.prefix} 」`);
    client.user.setActivity(`Online ${clock.DateTimeBot()}`);
    db.addReport(`History-Bot-re-login`, `Kenya-sensei 「 ${client.config.prefix} 」Ready (Websocket: ${client.user.tag})`);

    // Send Infomation Bot Online in Channel
    const ch1 = "798163730982502400";
    const ch2 = "929327327219957821";
    const ch3 = "820266124313755659";

    const embed = new MessageEmbed()
      .setDescription("Sensei-bot Kembali")
      .setColor("RANDOM")
      .setThumbnail(client.user.displayAvatarURL())
      .addField("System", `
          Uptime Bot : ${clock.DateTimeBot()}
          CPU : ${model}
          Platfrom : ${platform}`)
      .setFooter("Powered By Server Ahul")

    let ch, ch_vc;
    ch = client.channels.cache.find(channel => channel.id === ch1);
    ch.send(embed).then(msg => msg.delete({ timeout: 30000 }));
    ch = client.channels.cache.find(channel => channel.id === ch2);
    ch.send(embed).then(msg => msg.delete({ timeout: 30000 }));
    ch_vc = client.channels.cache.find(channel => channel.id === ch3);

    // Auto join bot in channel music WWM
    await ch_vc.join().then(() => {
      // Yay, it worked!
      console.log("Successfully connected.");
    }).catch(e => {
      // Oh no, it errored! Let's log it to console :)
      console.error(e);
      db.addReport(`Bot-Error`, `ready Error: ${e}`);
    });
  } catch (e) {
    db.addReport(`Bot-Error`, `ready Error: ${e}`);
  }

};