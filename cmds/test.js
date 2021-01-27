const Discord = require('discord.js');
const _ = require('lodash');
const rcolor = require('rcolor');

module.exports = {
  name: 'test',
  aliases: [],
  description: `Does whatever I need it to do when I need it to do it.`,
  args: true,
  displayInHelp: true,
  execute(message, args) {},
};

//.then(() => embed.react('👍'))
//.then(() => embed.react('👎'))
//.catch(console.log('Failed to add emotes to message'));
