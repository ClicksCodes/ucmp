const roles = require("../data/roles.json");
const setup = require("../data/setup.json");;

exports.run = (client, message, args) => {

    if(!message.member.roles.cache.has(roles.Moderator)) return message.reply({embed: {
        title:"Perms",
        color:setup.warn,
        description:"We can see you trying this you know"
    }});

    if(!args || args.length < 1) return message.channel.send({embed: {
        title:"Arguments",
        color:setup.error,
        description:"Not enough arguments please format the command like this: `cmp purge {count}`"
    }});

    const count = args[0];

    message.channel.bulkDelete(count)
        .catch(error => message.channel.send(`Couldn't delete messages due to: ${error}`));
    message.channel.send({embed:{
        title:"Success",
        color:setup.success,
        description:`Successfully deleted ${count} messages`
    }});

    client.channels.cache.get(setup.modLogs).send({embed: {
        title:"Purged Messages",
        color:setup.info,
        description:`${message.member} has purged ${message.channel} of ${count} messages`
    }})
};

exports.help = {
  purname:"Purge",
  purdescription:"Purge x messages in the current channel",
  purusage:"cmp purge x",
  purperms:"Moderator and up"
};
