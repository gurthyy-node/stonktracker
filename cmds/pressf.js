const Discord = require('discord.js');
const _ = require('lodash');
const rcolor = require('rcolor');

module.exports = {
  name: 'pressf',
  aliases: ['f'],
  description: 'Press F to pay REspects',
  args: false,
  displayInHelp: true,
  async execute(message, args) {
    const filter = (m) => m.author.id === message.author.id;
    message.reply(`Who are we paying respects to?`);
    await message.channel
      .awaitMessages(filter, {
        max: 1,
        time: 30000,
      })
      .then((collected) => {
        let respectName = collected.first().content;
        message.channel
          .send('Press F to pay respects to ***' + respectName + '***')
          .then(async function (message) {
            await message.react('🇫');
            const reactFilter = (reaction) => {
              return reaction.emoji.name === '🇫';
            };
            const reactCollector = message.createReactionCollector(
              reactFilter,
              { time: 30000 },
            );
            reactCollector.on('collect', (reaction, user) => {
              message.channel.send(user.username + ' has paid their respects');
            });
            reactCollector.on('end', (collected) => {
              message.channel.send(
                `${collected.size} people paid their respects to ` +
                  respectName,
              );
            });
          });
      });
    // Build embed
    /* let embed = new Discord.MessageEmbed();
    embed.setTitle('About StonkTracker');
    embed.setColor(rcolor());

    embed.setFooter('');
    embed.setDescription(
      ` StonkTracker was created by ***@Gurthyy#8735*** using Discord.JS. \n\r It's primary function is to provide additional bots in the User list to provide up-to-date stock prices. Other features are in development, and suggestions are always welcome!`,
    );
    message.channel.send(embed);*/
  },
};
