const roles = require("../data/roles.json");
const setup = require("../data/setup.json");

exports.run = (client, message, args) => {
    message.channel.send({embed:{
        title:"**MERCH**",
        color:setup.dev,
        description:"You can find our merch [here](http://merch.clicksminuteper.net)"
    }})
};