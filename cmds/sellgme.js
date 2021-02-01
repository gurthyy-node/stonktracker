const Discord = require('discord.js');
const _ = require('lodash');
const rcolor = require('rcolor');

module.exports = {
  name: 'sellgme',
  aliases: [''],
  description: 'Sell that shit.',
  args: false,
  displayInHelp: false,
  async execute(message, args) {
    message.channel.send(
      '<:redrocket:805835089396498504><:redrocket:805835089396498504><:redrocket:805835089396498504> 🇸 🇪 🇱 🇱 🇬 🇲 🇪 <:redrocket:805835089396498504><:redrocket:805835089396498504><:redrocket:805835089396498504>',
    );
  },
};
