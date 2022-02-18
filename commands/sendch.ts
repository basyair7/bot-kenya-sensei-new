module.exports = {
    name: 'send ch',
    run: async(client, message, args) => {
        try{
            let chselection = args.join(' ');
            let selection = message.content.split(' | ');
            if(chselection === "ch01"){
               const ch01 = client.channels.cache.find(channel => channel.id === "798157102249541684")
               ch01.send(selection[1])
            }
            else if(chselection === "ch02"){
               const ch02 = client.channels.cache.find(channel => channel.id === "929327327219957821")
               ch02.send(selection[1])
            }
        } catch(e){
            console.log(e)
        }
    }
}
