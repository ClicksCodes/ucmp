const roles = require("../data/roles.json");
const setup = require("../data/setup.json");

exports.run = (client, message, [mention, ...reason], err) => {
    if (!message.member.roles.cache.has(roles.Helper)) {
        return message.channel.send({embed: {
            title:"Perms...",
            color:setup.warn,
            description:`Hey ${message.member} we'll warn you next time.`
          }});
    }

    if (message.mentions.members.size === 0)
      return message.channel.send({embed: {
        title:"Arguments",
        color:setup.error,
        description:"Not enough arguments please format the command like this: `cmp warn {user} {reason(opt.)}`"
    }});

    const warnMember = message.mentions.members.first();

    warnMember.send({embed: {
        title:"You have been Warned",
        color:setup.warn,
        description:`You ${warnMember} have been warned for ${reason.join(" ")}`
    }});

    client.channels.cache.get(setup.modLogs).send({embed: {
        title:"Warn",
        color:setup.info,
        description:`${message.member} has warned ${warnMember} for ${reason.join(" ")}`
    }});

};
exports.help = {
  warname:"Warn",
  wardescription:"Warns a user",
  warusage:"cmp warn @user",
  warperms:"Helepr+"
};
