const roles = require("../data/roles.json");
const setup = require("../data/setup.json");

exports.run = (client, message, [mention, ...reason]) => {

    if (!message.member.roles.cache.has(roles.Moderator))
      return message.channel.send({embed: {
        title:"Perms...",
        color:setup.warn,
        description:`Hey ${message.member} could you not. Thanks.`
      }});

    if (message.mentions.members.size === 0)
      return message.channel.send({embed: {
        title:"Arguments",
        color:setup.error,
        description:"Not enough arguments please format the command like this: `cmp kick {user} {reason(opt.)}`"
      }});

    const kickMember = message.mentions.members.first();

    kickMember.kick(reason.join(" ")).then(member => {
      message.channel.send({embed: {
        title:"Member Kicked",
        color:setup.success,
        description:`Successfully kicked ${kickMember} for ${reason.join(" ")}`
      }});
    });
    client.channels.cache.get(setup.modLogs).send({embed: {
      title:"Kicked Member",
      color:setup.info,
      description:`${message.member} has kicked ${kickMember} for ${reason.join(" ")}`
    }})
  };
