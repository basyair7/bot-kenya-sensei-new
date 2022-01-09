const ytdl = require("discord-ytdl-core");
const youtubeScraper = require("yt-search");
const yt = require("ytdl-core");
const { MessageEmbed, Util } = require("discord.js");
const forHumans = require("../utils/forhumans.js");
const ms = require("pretty-ms");

exports.run = async (client, message, args) => {
  try{
    const channel = message.member.voice.channel;

    const error = (err) => message.channel.send(err);
    const send = (content) => message.channel.send(content);
    const setqueue = (id, obj) => message.client.queue.set(id, obj);
    const deletequeue = (id) => message.client.queue.delete(id);
    var song;

    if (!channel) return error("KAMU HARUS JOIN CHANNEL DULU NAK!").then(message => message.delete({timeout: 10000}));

    if (!channel.permissionsFor(message.client.user).has("CONNECT"))
      return error("I don't have permission to join the voice channel").then(message => message.delete({timeout: 10000}));

    if (!channel.permissionsFor(message.client.user).has("SPEAK"))
      return error("I don't have permission to speak in the voice channel").then(message => message.delete({timeout: 10000}));

    const query = args.join(" ");

    if (!query) return error("You didn't provide a song name to play!").then(message => message.delete({timeout: 10000}));

    if (query.includes("www.youtube.co.id")) {
      try {
        const ytdata = await await yt.getBasicInfo(query);
        if (!ytdata) return error("No song found for the url provided").then(message => message.delete({timeout: 10000}));
        song = {
          name: Util.escapeMarkdown(ytdata.videoDetails.title),
          thumbnail:
            ytdata.player_response.videoDetails.thumbnail.thumbnails[0].url,
          requested: message.author,
          videoId: ytdata.videoDetails.videoId,
          duration: forHumans(ytdata.videoDetails.lengthSeconds),
          url: ytdata.videoDetails.video_url,
          views: ytdata.videoDetails.viewCount,
        };
    } catch (e) {
      console.log(e);
      return error("Error occured, please check console").then(message => message.delete({timeout: 10000}));
    }
  } else {
    try {
      const fetched = await (await youtubeScraper(query)).videos;
      if (fetched.length === 0 || !fetched)
        return error("I couldn't find the song you requested!'").then(message => message.delete({timeout: 10000}));
      const data = fetched[0];
      song = {
        name: Util.escapeMarkdown(data.title),
        thumbnail: data.image,
        requested: message.author,
        videoId: data.videoId,
        duration: data.duration.toString(),
        url: data.url,
        views: data.views,
      };
    } catch (err) {
      console.log(err);
      return error("An error occured, Please check console").then(message => message.delete({timeout: 10000}));
    }
  }

  var list = message.client.queue.get(message.guild.id);

  if (list) {
    list.queue.push(song);
    return send(
      new MessageEmbed()
        .setAuthor(
          "The song has been added to the queue",
          "https://img.icons8.com/color/2x/cd--v3.gif"
        )
        .setColor("F93CCA")
        .setThumbnail(song.thumbnail)
        .addField("Song Name", song.name, false)
        .addField("Views", song.views, false)
        .addField("Duration", song.duration, false)
        .addField("Requested By", song.requested.tag, false)
        .setFooter("Positioned " + list.queue.length + " In the queue")
      ).then(message => message.delete({timeout: 10000}));
  }

  const structure = {
    channel: message.channel,
    vc: channel,
    volume: 90,
    playing: true,
    queue: [],
    connection: null,
  };

  setqueue(message.guild.id, structure);
  structure.queue.push(song);

  try {
    const join = await channel.join();
    structure.connection = join;
    play(structure.queue[0]);
  } catch (e) {
    console.log(e);
    deletequeue(message.guild.id);
    return error("I couldn't join the voice channel, Please check console").then(message => message.delete({timeout: 10000}));
  }

    async function play(track) {
      try {
        const data = message.client.queue.get(message.guild.id);
        const uptime = ms(client.uptime, {verbose:true})
        
        if (!track) {
          client.user.setActivity(`Online at ${uptime}`);
          data.channel.send("Queue is empty, Leaving voice channel").then(message => message.delete({timeout: 10000}));
          message.guild.me.voice.channel.leave();
          //messagePlay.delete({timeout: 5000}, true)
          return deletequeue(message.guild.id);
        }

        data.connection.on("disconnect", () => deletequeue(message.guild.id));

        const source = await ytdl(track.url, {
          filter: "audioonly",
          bitrate: 192000,
          quality: "highestaudio",
          highWaterMark: 1<<25,
          opusEncoded: true,
        }, {highWaterMark: 50});

        const playnow = new MessageEmbed()
            .setAuthor(
              "Started Playing",
              "https://img.icons8.com/color/2x/cd--v3.gif"
            )
            .setColor("9D5CFF")
            .setImage(track.thumbnail)
            .addField("Song Name", track.name, false)
            .addField("Views", track.views, false)
            .addField("Duration", track.duration, false)
            .addField("URL", track.url, false)
            .addField("Requested By", track.requested, false)
            .setFooter("Youtube Music Player");

        const filter = (reaction, user) => {
            return [`🛑`, `⏭️`, `↪️`].includes(reaction.emoji.name) && user.id === message.author.id;
        };

        const messagePlay = await message.channel.send(playnow)
        messagePlay.react(`🛑`);
        messagePlay.react(`⏭️`);
        messagePlay.react(`↪️`);
        messagePlay.awaitReactions(filter, { max: 1 }).then(collected =>{
            const reaction = collected.first();
            if (reaction.emoji.name === `🛑`) {
                if (!message.member.voice.channel) {
                   return;
                }
                const stopPlay = require('./stop.ts');
                stopPlay.run(client, message, args);
            }
            else if (reaction.emoji.name === `⏭️`) {
                if (!message.member.voice.channel) {
                   return;
                }
                const skipPlay = require('./skip.ts');
                skipPlay.run(client, message, args);
            }
            else if(reaction.emoji.name === `↪️`) {
                if (!message.member.voice.channel) {
                   return;
                }
                const looping = require('./loop.ts');
                looping.run(client, message, args);
             }
        }).catch(collected => console.log("Error"));

        try{
          const player = data.connection
            .play(source, { type: "opus" })
            .on("finish", () => {
              var removed = data.queue.shift();
              if(data.loop == true){
                data.queue.push(removed)
              }
              play(data.queue[0]);
              messagePlay.delete({timeout: 10000});
            });

          player.setVolumeLogarithmic(data.volume / 100);

        } catch(e){
          console.log("Error");
        }

        client.user.setActivity(`Music : ${track.name}`, { type: "LISTENING", url: `${track.url}` });

      } catch (e) {
        console.error(e);
      }
    }
  }catch(e){
    console.error(e);
  }
};

module.exports.config = {
  name: "play",
  aliases: ['p']
}
