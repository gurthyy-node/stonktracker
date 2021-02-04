const Discord = require('discord.js');
const _ = require('lodash');
const rcolor = require('rcolor');

module.exports = {
  name: 'holdgme',
  aliases: [''],
  description: 'Hold that shit.',
  args: false,
  displayInHelp: false,
  async execute(message, args) {
    message.channel.send(
      '<:holdrocket:805864187183104000><:holdrocket:805864187183104000><:holdrocket:805864187183104000> 🇭 🇴 🇱 🇩 🇬 🇲 🇪 <:holdrocket:805864187183104000><:holdrocket:805864187183104000><:holdrocket:805864187183104000>',
    );
  },
};
