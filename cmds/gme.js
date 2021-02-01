const Discord = require('discord.js');
const _ = require('lodash');
const rcolor = require('rcolor');

module.exports = {
  name: 'gme',
  aliases: ['buygme'],
  description: 'GME',
  args: false,
  displayInHelp: false,
  async execute(message, args) {
    message.channel.send(
      ' <:DFV3:804814098659409970><:dfv:804813161009119262><:DFV2:804813835553734656>🚀 🇬 🇲 🇪 🇬 🇲 🇪 🚀<:DFV3:804814098659409970><:dfv:804813161009119262><:DFV2:804813835553734656>',
    );
  },
};
