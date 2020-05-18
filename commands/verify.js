const roles = require("../data/roles.json");
const setup = require("../data/setup.json");


exports.run = (client, message, args) => {
    if(message.member.roles.cache.has(roles.member)) {
        return message.channel.send({embed: {
            title:"Dummy",
            color:setup.info,
            description:"You already have that role!"
        }});
    } else {
        const time = new Date()
        message.member.roles.add(roles.member)
        client.channels.cache.get(setup.joinLeave).send({ embed: {
            title:"Verification",
            color:setup.info,
            description:`Verified ${message.member} at ${time.getUTCHours()}:${time.getMinutes()}:${time.getSeconds()}:${time.getMilliseconds()}`
        }});
    }
};
