const roles = require("../data/roles.json");
const setup = require("../data/setup.json");

exports.run = (client, message, [mention, value, increment]) => {
    if (!message.member.roles.cache.has(roles.Helper)) {
        return message.channel.send({embed: {
            title:"Perms...",
            color:setup.warn,
            description:`Hey ${message.member} could you not. Thanks.`
          }});
    };

    if (message.mentions.members.size === 0)
      return message.channel.send({embed: {
        title:"Arguments",
        color:setup.error,
        description:"Not enough arguments please format the command like this: `cmp mute {user} {reason(opt.)}`"
    }});

    const muteMember = message.mentions.members.first();



    client.channels.cache.get(setup.modLogs).send({embed: {
        title:"Muted",
        color:setup.info,
        description:`${message.member} has muted ${muteMember} for ${value}${increment}`
    }});
};
exports.help = {
  mutname:"Mute",
  mutdescription:"Mutes a user for specified amount of time",
  mutusage:"cmp mute @user {value} {increment}",
  mutperms:"Helper+"
};
