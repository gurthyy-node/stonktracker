const Discord = require('discord.js');
const _ = require('lodash');
const rcolor = require('rcolor');

module.exports = {
  name: 'about',
  aliases: [],
  description: 'About StonkTracker Bot',
  args: false,
  displayInHelp: true,
  execute(message, args) {
    // Build embed
    let embed = new Discord.MessageEmbed();
    embed.setTitle('About StonkTracker');
    embed.setColor(rcolor());

    embed.setFooter('');
    embed.setDescription(
      ` StonkTracker was created by ***@Gurthyy#8735*** using Discord.JS. \n\r It's primary function is to provide additional bots in the User list to provide up-to-date stock prices. Other features are in development, and suggestions are always welcome!`,
    );
    message.channel.send(embed);
  },
};
