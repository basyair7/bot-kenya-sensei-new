module.exports = {
    name: 'send ch',
    run: async(client, message, args) => {
        try{
            let says = args.join(' ');
            const ch01 = client.channels.cache.find(channel => channel.id === "943006597641293854")
            ch01.send(says)
        } catch(e){
            console.log(e)
        }
    }
}
