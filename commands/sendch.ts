module.exports = {
    name: 'send ch',
    run: async(client, message, args) => {
        try{
            let ch;
            let selection = message.content.split(' | ');
            if(args[0] === "ch01"){
               ch = client.channels.cache.find(channel => channel.id === "798157102249541684")
               return ch.send(selection[1])
               
            }
            else if(args[0] === "ch02"){
               ch = client.channels.cache.find(channel => channel.id === "854379430963970058");
               return ch.send(selection[1])
            }
            else if(args[0] === "ch03"){
               ch = client.channels.cache.find(channel => channel.id === "798163730982502400");
               return ch.send(selection[1])
            }
            else if(args[0] === "ch04"){
               ch = client.channels.cache.find(channel => channel.id === "821917495479894036");
               return ch.send(selection[1])
            }
            else if(args[0] === "ch05"){
               ch = client.channels.cache.find(channel => channel.id === "929327327219957821")
               return ch.send(selection[1])
            }
        } catch(e){
            console.log(e)
        }
    }
}
