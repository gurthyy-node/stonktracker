const Discord = require('discord.js');
const _ = require('lodash');
const rcolor = require('rcolor');

module.exports = {
  name: 'about',
  aliases: [],
  description: 'About DD Bot',
  args: false,
  displayInHelp: true,
  execute(message, args) {
    // Build embed
    let embed = new Discord.MessageEmbed();
    embed.setTitle('About DD Bot');
    embed.setColor(rcolor());

    embed.setFooter('About NookBot');
    embed.setDescription(
      'DD Bot was created by ***@Gurthyy#8735*** using Discord.JS to give a clean interface for Due Diligence reports.',
    );
    message.channel.send(embed);
  },
};
