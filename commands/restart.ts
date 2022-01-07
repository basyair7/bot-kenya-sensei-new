exports.run = async(client, message, args) => {
    await message.channel.send('Restarting bot...');
    return process.exit();
  }
  