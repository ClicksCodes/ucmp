const roles = require("../data/roles.json");
const setup = require("../data/setup.json");

exports.run = (client, message, args) => {
    var ping = Date.now() - message.createdTimestamp + " ms";
    message.channel.send({embed:{
        title:"Ping",
        color:setup.info,
        description:`The bots ping is ${message.createdTimestamp - Date.now()} ms`
    }});
};

