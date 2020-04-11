const roles = require("../data/roles.json");
const setup = require("../data/setup.json");
const fs = require("fs");

exports.run = (client, message, [filename, content]) => {
    if (!message.member.roles.cache.has(roles.Developer)) {
        return message.channel.send({embed:{
            title:"REEEEEEEEEE",
            color:setup.warn,
            description:"Why does everyone insist on using commands they dont have perms for"
        }});
    };
    fs.open(`${filename}`,'wx',(err,data) => {
        if (err) {
            if (err.code === 'EEXIST') {
                message.channel.send({embed:{
                    title:"Found that",
                    color:setup.warn,
                    description:`${filename} already exists`
                }});}
                throw err
            }
        let data = content;
        writeMyData(data);
    });
};