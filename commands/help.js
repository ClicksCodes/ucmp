const roles = require("../data/roles.json");
const setup = require("../data/setup.json");
const list = require("../data/commands.json");

exports.run = (client, message) => {
    if (!message.member.roles.cache.has(roles.member)) {
      return channel.message.send({embed:{
        title:"No Beans",
        color:setup.warn,
        description:`You don't have perms to run this`
      }});
    }

    message.channel.send({embed:{
      title:"Help",
      color:setup.success,
      fields: [
        {
          name:`**${list.ban.name}**`,
          value:`Description: ${list.ban.description}\nUsage: ${list.ban.usage}\nPerms: ${list.ban.perms}`
        },{
          name:`**${list.help.name}**`,
          value:`Description: ${list.help.description}\nUsage: ${list.help.usage}\nPerms: ${list.help.perms}`
        },{
          name:`**${list.kick.name}**`,
          value:`Description: ${list.kick.description}\nUsage: ${list.kick.usage}\nPerms: ${list.kick.perms}`
        },{
          name:`**${list.merch.name}**`,
          value:`Description: ${list.merch.description}\nUsage: ${list.merch.usage}\nPerms: ${list.merch.perms}`
        },{
          name:`**${list.mute.name}**`,
          value:`Description: ${list.mute.description}\nUsage: ${list.mute.usage}\nPerms: ${list.mute.perms}`
        },{
          name:`**${list.nick.name}**`,
          value:`Description: ${list.nick.description}\nUsage: ${list.nick.usage}\nPerms: ${list.nick.perms}`
        },{
          name:`**${list.ping.name}**`,
          value:`Description: ${list.ping.description}\nUsage: ${list.ping.usage}\nPerms: ${list.ping.perms}`
        },{
          name:`**${list.purge.name}**`,
          value:`Description: ${list.purge.description}\nUsage: ${list.purge.usage}\nPerms: ${list.purge.perms}`
        },{
          name:`**${list.reload.name}**`,
          value:`Description: ${list.reload.description}\nUsage: ${list.reload.usage}\nPerms: ${list.reload.perms}`
        },{
          name:`**${list.seq.name}**`,
          value:`Usage:${list.seq.usage}\n
          __Sub Commands:__\n
          **${list.seq.sub_cmds.init.name}:**\n
          Description:${list.seq.sub_cmds.init.description}\n
          Usage:${list.seq.sub_cmds.init.usage}\n
          Perms:${list.seq.sub_cmds.init.perms}\n
          **${list.seq.sub_cmds.add.name}:**\n
          Description:${list.seq.sub_cmds.add.description}\n
          Usage:${list.seq.sub_cmds.add.usage}\n
          Perms:${list.seq.sub_cmds.add.perms}\n
          **${list.seq.sub_cmds.fetch.name}:**\n
          Description:${list.seq.sub_cmds.fetch.description}\n
          Usage:${list.seq.sub_cmds.fetch.usage}\n
          Perms:${list.seq.sub_cmds.fetch.perms}\n
          **${list.seq.sub_cmds.specific.name}:**\n
          Description:${list.seq.sub_cmds.specific.description}\n
          Usage:${list.seq.sub_cmds.specific.usage}\n
          Perms:${list.seq.sub_cmds.specific.perms}\n
          **${list.seq.sub_cmds.delete.name}:**\n
          Description:${list.seq.sub_cmds.delete.description}\n
          Usage:${list.seq.sub_cmds.delete.usage}\n
          Perms:${list.seq.sub_cmds.delete.perms}\n`
        },{
          name:`**${list.shut.name}**`,
          value:`Description: ${list.shut.description}\nUsage: ${list.shut.usage}\nPerms: ${list.shut.perms}`
        },{
          name:`**${list.verify.name}**`,
          value:`Description: ${list.verify.description}\nUsage: ${list.verify.usage}\nPerms: ${list.verify.perms}`
        },{
          name:`**${list.warn.name}**`,
          value:`Description: ${list.warn.description}\nUsage: ${list.warn.usage}\nPerms: ${list.warn.perms}`
        }
        
      ]
    }});
};
