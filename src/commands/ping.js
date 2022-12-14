const model = require("../model");

exports.run = async(client, message, args) => {
  try {
    var ping = Date.now() - message.createdTimestamp;
    message.reply(`:ping_pong: Pong! ${ping}ms`);
  } catch (e) {
    console.log(e);
    model.addReport(`Bot-Error`, `ping Error: ${e}`);
  }
}

/*
exports.run = async(client, message, args) => {
    message.reply(`:ping_pong: Pong! ${client.ws.ping}ms`)
  }
*/
