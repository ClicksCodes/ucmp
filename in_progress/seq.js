const roles = require("../data/roles.json");
const setup = require("../data/setup.json");
const Sequelize = require("sequelize");
const sequelize = new Sequelize('database','user','password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging:false,
    storage:'database.sqlite',
});

const Tags = sequelize.define('tags', {
  name: {
    type: Sequelize.STRING,
    unique:true,
  },
  warns: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  mutes: {
    type: Sequelize.INTEGER,
    defaultValue:0,
    allowNull: false,
  },
  kicks: {
    type: Sequelize.INTEGER,
    defaultValue:0,
    allowNull: false,
  },
  bans: {
    type: Sequelize.INTEGER,
    defaultValue:0,
    allowNull: false,
  },
  usage_count: {
    type: Sequelize.INTEGER,
    defaultValue:0,
    allowNull: false,
  }
});

exports.run = (client, message, [sub,mention,w,m,k,b]) => {

    const checkUser = message.mentions.members.first();

    if(sub==="init") {

        if (!message.member.roles.cache.has(roles.Moderator)) { 
            return message.channel.send({embed:{
                title:"Perms...",
                color:setup.warn,
                description:`This won't work for you ${message.member}!`
            }});
        };

        Tags.sync();
        message.channel.send({embed:{
            title:"Syncing...",
            color:setup.info,
            description:"Syncing with Logs"
        }});
    };
    if(sub==="add") {
        if (!message.member.roles.cache.has(roles.Moderator)) { 
            return message.channel.send({embed:{
                title:"Perms...",
                color:setup.warn,
                description:`This won't work for you ${message.member}!`
            }});
        };
        try {
            const tag = await Tags.create({
                name:checkUser,
                warns:w,
                mutes:m,
                kicks:k,
                bans:b,
                usage_count:0,
            });
            return message.channel.send({embed: {
                title:"Added",
                color:setup.success,
                description:`Added ${checkUser} to the log with ${w} warns, ${m} mutes, ${k} kicks, and ${b} bans`
            }});
        }
        catch(e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                return message.channel.send({embed: {
                    title:"Ruh roh",
                    color:setup.error,
                    description:`failed to add ${checkUser} because he/she is already added ${Tags.findOne({where:{name:`${checkUser}`}})}`
                }});
            }
            return message.channel.send({embed:{
                title:"I dunno",
                color:setup.warn,
                description:`Something went wrong when adding ${checkUser} to the list`
            }})
        };
    };
    if(sub==="fetch") {
        if (!message.member.roles.cache.has(roles.Helper)) { 
            return message.channel.send({embed:{
                title:"Perms...",
                color:setup.warn,
                description:`This won't work for you ${message.member}!`
            }});
        };
        const tag = await Tags.findOne({where:{name:`${checkUser}`}});
        if(tag) {
            tag.increment('usage_count');
            return message.channel.send({embed:{
                title:`${checkUser}'s stats`,
                color:setup.info,
                fields: [{
                    name:"Warns",
                    value:tag.get('warns'),
                },{
                    name:"Mutes",
                    value:tag.get('mutes'),
                },{
                    name:"Kicks",
                    value:tag.get('kicks'),
                },{
                    name:"Bans",
                    value:tag.get('bans'),
                }
            ],
            timstamp: new Date(),
            footer: {
                icon_url: client.user.avatarURL,
                text:`from cmp sequelize fetch ${checkUser}`
            }
            }});
            
        }
        return message.channel.send({embed:{
            title:"Awwwwwwww",
            color:setup.error,
            description:`couldn't find ${checkUser}'s tag`
        }});
    };
    if(sub==="specific"){
        if (!message.member.roles.cache.has(roles.Helper)) { 
            return message.channel.send({embed:{
                title:"Perms...",
                color:setup.warn,
                description:`This won't work for you ${message.member}!`
            }});
        };
        const tag = await Tags.findOne({where:{name:`${checkUser}`}});
        if (tag) {
            return message.channel.send({embed:{
                title:`Exact tag info for ${checkUser}`,
                color:setup.info,
                fields: [{
                    name:"Tag name:",
                    value:`${checkUser}`,
                },{
                    name:"Created By:",
                    value:`${tag.username}`,
                },{
                    name:"Creation Time:",
                    value:`${tag.createdAt}`,
                },{
                    name:"Usage",
                    value:`Used ${tag.usage_count} times`,
                },
                ],
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text:`from cmp sequelize specific ${checkUser}`,
                }
            }});
        }
        return message.channel.send({embed:{
            title:"Name Error",
            color:setup.warn,
            description:`Couldn't find tag with name ${checkUser}`
        }});
    };
    if(sub==="all"){
        if (!message.member.roles.cache.has(roles.Helper)) { 
            return message.channel.send({embed:{
                title:"Perms...",
                color:setup.warn,
                description:`This won't work for you ${message.member}!`
            }});
        };
        async const tagList = await Tags.findAll({attributes:['name']});
        const tagString = tagList.map(t => t.name).join(", ") || 'No tags set.';
        return message.channel.send({embed:{
            title:"List of all current tags",
            color:setup.info,
            description:tagString
        }});
    };
    if(sub==="delete"){
        if (!message.member.roles.cache.has(roles.Developer)) { 
            return message.channel.send({embed:{
                title:"Perms...",
                color:setup.warn,
                description:`This won't work for you ${message.member}!`
            }});
        };
        const rowCount = await Tags.destroy({where:{name:`${checkUser}`}});
        if(!rowCount) {
            return message.channel.send({embed:{
            title:"404",
            color:setup.warn,
            description:`The tag: ${checkUser} does not exist`
        }});};
        return message.channel.send({embed:{
            title:"204",
            color:setup.success,
            description:`Deleted tag: ${checkUser} successfully!`
        }});
    };
};