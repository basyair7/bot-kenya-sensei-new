module.exports = {
    name: 'send ch',
    run: async(client, message, args) => {
        try{
        
            let selection = message.content.split(' | ');
            if(args[0] === "ch01"){
               const ch01 = client.channels.cache.find(channel => channel.id === "798157102249541684")
               ch01.send(selection[0])
            }
            else if(args[0] === "ch02"){
               const ch02 = client.channels.cache.find(channel => channel.id === "929327327219957821")
               ch02.send(selection[0])
            }
        } catch(e){
            console.log(e)
        }
    }
}
