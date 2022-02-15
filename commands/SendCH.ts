module.export = {
  name: 'SendCH',
  run: async(client, message, args) => {
    var says = args.join(' ');
    const channel01 = client.channels.cache.find(channel => channel.id "943006597641293854");
    channel01.send(says);
  }
}
