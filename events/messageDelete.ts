const {addReport} = require("../model/dbReport");
const { addSnipemsg } = require("../model/dbMessage");

module.exports = async (client, message) => {
    try {
        if (message.author.bot) return;
       
        addSnipemsg(
            TrackTime(),
            message.content,
            message.author.tag,
            message.author.id,
            message.channel.id
        )

        /*
        client.snipes.set(message.channel.id, {
            content: message.content,
            author: message.author.tag,
            member: message.member,
            image: message.attachments.first() ? message.attachments.first().proxyURL : null
        })
        */
        
        
    } catch (e) {
        console.log(e);
        addReport(`Bot-Error`, `messageDelete.ts Error: ${e}`);
    }
}

var { DateTime } = require("luxon");

function TrackTime(){
  var local = DateTime.local();
  var rezonedString = local.setZone("Asia/Jakarta");
  
  // get Date
  let year = rezonedString.c.year;
  let month = rezonedString.c.month;
  let day = rezonedString.c.day;
  
  // get Time
  let hour = rezonedString.c.hour;
  let minute = rezonedString.c.minute;
  let second = rezonedString.c.second;

  let datetime = `${day}-${month}-${year}-${hour}-${minute}-${second}`;
  return datetime;
}
