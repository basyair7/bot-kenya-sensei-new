const {addReport} = require("../model/dbReport");
exports.run = async(client, message, args) => {
  try {
    var ping = Date.now() - message.createdTimestamp;
    message.reply(`:ping_pong: Pong! ${ping}ms`);
  } catch (e) {
    console.log(e);
    addReport(`Bot-Error`, `ping.ts Error: ${e}`);
  }
}

/*
exports.run = async(client, message, args) => {
    message.reply(`:ping_pong: Pong! ${client.ws.ping}ms`)
  }
*/
