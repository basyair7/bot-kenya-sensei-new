exports.run = async(client, message, args) => {
    var ping = Date.now() - message.createdTimestamp;
    message.reply(`:ping_pong: Pong! ${ping}ms`);
}

/*
exports.run = async(client, message, args) => {
    message.reply(`:ping_pong: Pong! ${client.ws.ping}ms`)
  }
*/
