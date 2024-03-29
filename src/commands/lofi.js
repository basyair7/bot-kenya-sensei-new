const { MessageEmbed } = require("discord.js");
const model = require("../model");
const ytdl = require("ytdl-core");
const ms = require("pretty-ms");
const db = require("../database"); 

exports.run = async(client, message, args) => {
  try{
    let cmd = args[0].toLowerCase();
    const channel = message.member.voice.channel;
    let setSong = message.content.split(': ');

    if(cmd === "help"){
      const list = `on\`\` => Play lofi hip hop radio 24/7,
      off\`\` => Stop the song and leave the voice channel you are in, 
      on : 2 <2-3>\`\` => Select Playing Lofi Song 24/7 `;

      const filter = (reaction, user) => {
            return [`❎`].includes(reaction.emoji.name) && user.id === message.author.id;
      };

      const revisedList = list
                      .split('\n')
                      .map((x) => "• " + "``" + client.config.prefix + "lofi " + x.trim())
                      .join('\n');

      const view_msg = new MessageEmbed()
              .setTitle("Play Lofi Song 24/7")
              .setDescription("Play Lofi Hip Hop Radio 24/7 https://youtu.be/jfKfPfyJRdk")
              .addField("List Channel", revisedList)

      return message.channel.send(view_msg).then(embedMessage => {
              embedMessage.react(`❎`);
              embedMessage.awaitReactions(filter, { max: 1 }).then(collected =>{
                  const reaction = collected.first();

                  if (reaction.emoji.name === `❎`){
                      embedMessage.delete({timeout: 5000});
                  }
              }).catch(collected => {console.log("Error")});
      });
    }

    else if(cmd === "on"){
      db.ref("LoFi").once('value', async(snapshot) => {
        if (snapshot.val() !== null) {
          var links = await snapshot.val();

          if(setSong[1] === "2") {
            play(links["LoFi-2"])
          }
            
          else if(setSong[1] === "3"){
            play(links["LoFi-3"]);
          }
          else{
            //TODO
          }

          play(links["LoFi-1"]);
        } else;
      });
    }

    else if(cmd === "off"){
      if (!channel){
        return message.channel.send(
          "KAMU HARUS JOIN CHANNEL DULU NAK!"
        ).then(message => message.delete({timeout: 10000}));
      }
      
      await channel.leave();
      message.channel.send(
        new MessageEmbed()
          .setTitle("Stop Playing Lofi Song 24/7")
          .setDescription("**Left the voice channel :white_check_mark: **")
          .setColor("BLUE")
      ).then(message => message.delete({timeout: 10000}));
      
      const uptime = ms(client.uptime, {verbose:true});
      return client.user.setPresence({
          status: 'online',
          activity: {
              name: `Uptime (${uptime})`,
              type: "COMPETING"
          }
      });
    }

    else{
      message.reply("Perintah tidak tersedia...").then(message => message.delete({timeout: 10000}));
    }
  
  const play = async(links) => {
    if (!channel)
      return message.channel.send(
        "KAMU HARUS JOIN CHANNEL DULU NAK!"
      ).then(message => message.delete({timeout: 10000}));

    if (!channel.permissionsFor(message.client.user).has("CONNECT"))
      return console.error("I don't have permission to join the voice channel");
  
    if (!channel.permissionsFor(message.client.user).has("SPEAK"))
      return console.error("I don't have permission to speak in the voice channel");

    const connect = await channel.join();
    connect.play(ytdl(links));
    connect.voice.setSelfDeaf(true);

    client.user.setPresence({
      status: 'online',
      activity: {
        name: `LoFi Hip-Hop Radio 24/7 ${links}`,
        type: "PLAYING",
      }
    });

    return message.channel.send(
      new MessageEmbed()
      .setTitle("Started Playing", "https://img.icons8.com/color/2x/cd--v3.gif")
      .setDescription(`Playing LoFi Hip-Hop Radio 24/7 for ${message.author}\n${links}`)
      .setColor("BLUE")
    ).then(message => message.delete({timeout: 10000}));
  }
    
  } catch(e){
    console.log(e);
    model.addReport(`Bot-Error`, `lofi Error: ${e}`);
  }
}
