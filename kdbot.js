'use strict';

let Botkit = require('botkit');
let controller = Botkit.slackbot();
let bot = controller.spawn({
  token: 'xoxb-18080744019-faM0j4W463WjwykawSxvTh9y'
}).startRTM((err, bot, payload) => {
  if (err) {
    throw new Error('Could not connect to Slack');
  }
});

controller.hears(['hi'], ['direct_message', 'ambient', 'mention'], function(bot, message) {
  bot.reply(message, 'Looks like Heroku\'s back up!');
});
