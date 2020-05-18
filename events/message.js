const config = require("../data/config.json");

module.exports = async (client, message) => {

    const newMSG = message.content.toLowerCase();

    if(message.author.bot) return;

    if(newMSG.indexOf(config.prefix) !== 0) return;

    const args = newMSG.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift()

    const cmd = client.commands.get(command);

    if(!cmd) return;

    cmd.run(client, message, args);
};