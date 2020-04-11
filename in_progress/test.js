const roles = require("../data/roles.json");
const setup = require("../data/setup.json");
const Enmap = require("enmap");
const fs = require("fs");
const testFiles = require("./in_progress/");


exports.run = (client, message, cmd) => {

    testable = new Enmap();

    fs.readdir(testFiles, (err, files) => {
        if (err) return console.error(err) 
        && 
        client.channels.cache.get(setup.errLogs).send({embed: {
        title:"Error",
        color:setup.info,
        description:`${err}`
        }});
        files.forEach(file => {
            if (!file.endsWith(".js")) return;
            
            let props = require(`${testFiles}${file}`);
            
            let commandName = file.split(".")[0];
            console.log(`Attempting to test command ${commandName}`);
            
            client.commands.set(commandName, props);
        });
    });

    if (!message.member.roles.cache.has(roles.Helper)) { 
        return message.channel.send({embed:{
            title:"No perms",
            color:setup.warn,
            description:`You don't have the correct privileges. Requires <@${roles.Helper}> or higher`
        }})
    };

    const testing = testable.get(cmd);

    if(!testing) return message.channel.send({embed:{
        title:"Unable to test",
        color:setup.dev,
        description:`Read the bloody title: ${title}`
    }});
};