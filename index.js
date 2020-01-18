const Discord = require('discord.js');
const express = require('express');
const {prefix, token, interval}= require('./config.json');
const app = express();
const markov = require('./markov.js');

var discordBot = {
  msgIntervalID: null,
  interval: interval
};

//Express
app.listen(3000, () => console.log('listening on port' + 3000));

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

app.get('/discordbot', (req, res) => {
  res.status(200).send('webhook');
})

// Discord.js
const client = new Discord.Client();

client.once('ready', () => {
  console.log('Ready!');
});

client.on('message', message => {
  if (message.content === `${prefix}start`){
    message.channel.send('prepare for messages!');
    sendRecurringMessage(message);
  }
  else if (message.content === `${prefix}stop`) {
    message.channel.send('no more messages!');
    stopMessaging();
  }
  else if (message.content.startsWith(`${prefix}set interval`)) {
    const args = message.content.slice(prefix.length).split(' ' );
    const interval = args[2];
    discordBot.interval = parseInt(interval);
    message.channel.send(`interval set to **${interval}**`);
    stopMessaging();
    sendRecurringMessage(message);
  }
});

client.login(token);

var sendRecurringMessage = (message) => {
  discordBot.msgIntervalID = setInterval(() => {
    let markovmsg = markov.generateMessage();
    message.channel.send(`**${markovmsg.message}**
    \t_-${markovmsg.name}_\n\`\`\`\n\n\`\`\``);
  },1000 * discordBot.interval);
};

var stopMessaging = () => {
  clearInterval(discordBot.msgIntervalID);
};