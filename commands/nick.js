const roles = require("../data/roles.json");
const setup = require("../data/setup.json");


exports.run = (client, message, [mention, ...nickname]) => {

    if (!message.member.roles.cache.has(roles.Helper)) {
      return message.channel.send({ embed: {
        title:"Perms...",
        color:setup.warn,
        description:`Sorry. You (${message.member.id}) don't have the perms for this.`
      }})
      &&
      message.member.setNickname("Troublemaker");
    }

    if (message.mentions.members.size === 0) {
      return message.channel.send({embed: {
        title:"Arguments",
        color:setup.error,
        description:"Not enough arguments please format the command like this: `cmp nick {user} [name]`"
      }})
    }

    const nickMember = message.mentions.members.first();

    nickMember.setNickname(nickname.join(" ")).then(member => {
        message.channel.send({embed : {
          title:"success",
          color:setup.success,
          description:`Successfully named ${nickMember}`
    }})
    });

    client.channels.cache.get(setup.modLogs).send({embed: {
        title:"",
        color:setup.info,
        description:`${message.member} has nicked ${nickMember} to ${nickname.join(" ")}`
    }});
};
exports.help = {
  nicname:"Nick",
  nicdescription:"Nick's a user",
  nicusage:"cmp nick @user",
  nicperms:"Helper+"
};
