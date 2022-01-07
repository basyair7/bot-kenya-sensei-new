const { MessageEmbed } = require("discord.js")

exports.run = async (client, msg, args) => {
  const input = args.join(' ')
  const user = client.users.cache.get(input) || client.users.cache.find(x => x.username == input) || msg.mentions.users.first() || msg.author
  const embed = new MessageEmbed()
  .setTitle(`${user.tag}`)
  .setDescription("Noh Muka mu nak.")
  .setImage(user.displayAvatarURL({dynamic:true, size:4096}))
  .setColor("RANDOM")
  msg.channel.send(embed)
}