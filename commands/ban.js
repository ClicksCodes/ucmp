const roles = require("../data/roles.json");
const setup = require("../data/setup.json");;

exports.run = (client, message, [mention, ...reason]) => {

    if (!message.member.roles.cache.has(roles.Admin)) {
      return message.channel.send({ embed: {
        title:"Perms...",
        color:setup.warn,
        description:`Hey ${message.member} stop. Thanks!`
      }})
    };

    if (message.mentions.members.size === 0)
      return message.channel.send({embed: {
        title:"Arguments",
        color:setup.error,
        description:"Not enough arguments please format the command like this: `cmp ban {user} [reason(opt.)]`"
      }});

    const banMember = message.mentions.members.first();

    banMember.ban(reason.join(" ")).then(member => {
      message.channel.send({embed : {
        title:"success",
        color:setup.success,
        description:`Successfully banned ${member} for ${reason.join(" ")}`
      }});

      client.channels.cache.get(setup.modLogs).send({embed: {
        title:"Banned User",
        color:setup.info,
        description:`${message.member} has banned ${banMember} for reason ${reason.join(" ")}`
      }})
    });
  };
