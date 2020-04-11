const roles = require("../data/roles.json");
const setup = require("../data/setup.json");

exports.run = async (client, message, count) => {
    if(message.member.roles.cache.has(roles.Developer)) {
        if(count>100) {
            await message.channel.send({embed:{
                title:"I'm sowwy senpai",
                color:setup.dev,
                description:`I am sufficiently shut ${message.member}`
            }});
        }
        for(i=1;i<count;i++) {
            await message.channel.send({embed:{
                color:setup.dev,
                image: {
                    url:"https://preview.redd.it/dwq88d3nnj141.png?auto=webp&s=bd77cd2a4bff2733aebe25d00500cf39853d0bb3"
            }}});
        }
    }
    return message.channel.send({embed:{
        color:setup.dev,
        image: {
            url:"https://preview.redd.it/dwq88d3nnj141.png?auto=webp&s=bd77cd2a4bff2733aebe25d00500cf39853d0bb3"
    }}});
};