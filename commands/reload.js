const roles = require("../data/roles.json");
const setup = require("../data/setup.json");

exports.run = (client, message, args) => {

    if (!message.member.roles.cache.has(roles.Developer)) {
      return message.channel.send({embed:{
        title:"Perms...",
        color:setup.warn,
        description:`Tsk Tsk Tsk ${message.member}. we knew you'd try it.`

      }})
    }

    if(!args || args.length < 1) return message.reply("Must provide a command name to reload.");
    const commandName = args[0];

    if(!client.commands.has(commandName)) {
      return message.reply("That command does not exist");
    }

    delete require.cache[require.resolve(`./${commandName}.js`)];

    client.commands.delete(commandName);
    const props = require(`./${commandName}.js`);
    client.commands.set(commandName, props);
    message.reply(`The command ${commandName} has been reloaded`);
  };