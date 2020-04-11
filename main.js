const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const winston = require("winston");

const logger = winston.createLogger({
  transports:[
    new winston.transports.Console(),
    new winston.transports.File({filename: 'log'}),
  ],
  format: winston.format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`),
});

const setup = require("./data/setup.json");
const client = new Discord.Client();
const config = require("./data/config.json");

client.config = config;

client.on('ready', () => {
    client.user.setActivity("with my owners");
    logger.log('info','The bot is online!');
});

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {

      if (!file.endsWith(".js")) return;

      const event = require(`./events/${file}`);

      let eventName = file.split(".")[0];

      client.on(eventName, event.bind(null, client));
      delete require.cache[require.resolve(`./events/${file}`)];
    });
  });

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err) 
    && 
    client.channels.cache.get(setup.errLogs).send({embed: {
      title:"Error",
      color:setup.info,
      description:`${err}`
    }});
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        
        let props = require(`./commands/${file}`);
        
        let commandName = file.split(".")[0];
        console.log(`Attempting to load command ${commandName}`);
        
        client.commands.set(commandName, props);
    });
});

client.on('debug', m => logger.log('debug',m));
client.on('warn', m => logger.log('warn',m));
client.on('error', m => logger.log('error',m));
process.on("uncaughtException",error=>logger.log('error',error));

client.login(config.token);