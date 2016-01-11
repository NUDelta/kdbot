'use strict';

let Botkit = require('botkit'),
    compliments = require('./compliments.js'),
    insults = require('./insults.js');

let controller = Botkit.slackbot();
controller.spawn({
  token: 'xoxb-18080744019-faM0j4W463WjwykawSxvTh9y'
}).startRTM((err, bot, payload) => {
  if (err) {
    throw new Error('Could not connect to Slack');
  }
});

controller.hears(['hi'], ['direct_message', 'ambient', 'direct_mention'], (bot, message) => {
  bot.reply(message, 'Looks like Heroku\'s back up!');
});

controller.hears(['compliment me'], ['direct_message', 'direct_mention'], (bot, message) => {
  bot.reply(message, selectRandomFromArray(compliments));
});

controller.hears(['compliment (<@.*>)'], ['direct_message', 'direct_mention'], (bot, message) => {
  bot.reply(message, `${message.match[1]} ${selectRandomFromArray(compliments)}`);
});

controller.hears(['insult me'], ['direct_message', 'direct_mention'], (bot, message) => {
  bot.reply(message, selectRandomFromArray(insults));
});

controller.hears(['insult (<@.*>)'], ['direct_message', 'direct_mention'], (bot, message) => {
  bot.reply(message, `${message.match[1]} ${selectRandomFromArray(insults)}`);
});

function selectRandomFromArray(array) {
  let index = Math.floor(Math.random() * array.length);
  return array[index];
}

// TODO: Format this better and make it automatic?
controller.hears(['help'], ['direct_message', 'direct_mention'], (bot, message) => {
  let helptext = 'I can do the following: \n\
    - compliment me: I can give you a self esteem boost! \n\
    - insult me: I can lower your self esteem! \n\
  ';
  bot.reply(message, helptext);
});
