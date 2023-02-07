const { 
    addReport, 
    getQNA 
} = require("../model");
const { programAfk } = require("../utils");

module.exports = async (client, message) => {
    try {
        programAfk(client, message);

        // command not ks
        let notks = message.content.toLowerCase();

        if (notks === "ping") {
            var res = Date.now() - message.createdTimestamp;
            message.reply(`:ping_pong: Pong! ${res}ms`);
        }

        // Check in Database
        getQNA((data) => {
            Object.keys(data).map((key) => {
                let answer = '';
                if (notks === data[key].q) {
                    answer = data[key].a;
                }

                switch(answer) {
                    case "seperti ini nak caranya..":
                        message.reply("seperti ini nak caranya..",{files:['./src/images/1556546505120.jpg']});
                        break;
                    case "Astaghfirullah, jarimu kasar nak":
                        message.reply("Astaghfirullah, jarimu kasar nak", {files:['./src/images/STK-20220129-WA0210.webp']});
                        break;

                    case "Hallo nak.. :slight_smile:":
                        message.reply("Hallo nak.. :slight_smile:", {files:['./src/images/STK-20220129-WA0213.webp']});
                        break;
                        
                    case "bajul":
                        message.reply({files:['./src/images/2234132402.jpg']});
                        break;

                    default:
                        if (answer) {
                            message.reply(`${answer}`);
                        } else;

                        break;
                }

            });

            

        });

        // prefix commands
        if (message.author.bot) return;

        if (message.content.toLowerCase().indexOf(client.config.prefix) !== 0) return;
        
        const args = message.content
            .slice(client.config.prefix.length)
            .trim()
            .split(/ +/g);
        const command = args.shift().toLowerCase();

        const cmd = client.commands.get(command);

        if (!cmd) return;

        cmd.run(client, message, args);
        
    } catch (e) {
        addReport(`Bot-Error`, `message Error: ${e}`);
        console.log(e);
    }

};
