const Discord = require('discord.js');
const _ = require('lodash');
const rcolor = require('rcolor');

module.exports = {
  name: 'pressf',
  aliases: ['f'],
  description: 'Press F to pay REspects',
  args: false,
  displayInHelp: false,
  async execute(message, args) {
    let reactedID = [];
    if (args.length == 0) {
      return message.reply(
        'try again. This time, tell me what you are paying respects to.',
      );
    }
    respectName = args.join(' ');
    message.channel
      .send('Press F to pay respects to ***' + respectName + '***')
      .then(async function (message) {
        await message.react('🇫');
        let reactCount = 0;
        const reactFilter = (reaction, user) => {
          return reaction.emoji.name === '🇫';
        };
        const reactCollector = message.createReactionCollector(reactFilter, {
          time: 30000,
        });
        reactCollector.on('collect', (reaction, user) => {
          if (reactedID.includes(user.id)) {
            return;
          }
          message.channel.send(user.username + ' has paid their respects');

          reactCount++;
          reactedID.push(user.id);
        });
        reactCollector.on('end', (collected) => {
          //console.log(collected);
          message.channel.send(
            `${reactCount} people paid their respects to **` +
              respectName +
              '**',
          );
        });
      });
  },

  // Build embed
  /* let embed = new Discord.MessageEmbed();
    embed.setTitle('About StonkTracker');
    embed.setColor(rcolor());

    embed.setFooter('');
    embed.setDescription(
      ` StonkTracker was created by ***@Gurthyy#8735*** using Discord.JS. \n\r It's primary function is to provide additional bots in the User list to provide up-to-date stock prices. Other features are in development, and suggestions are always welcome!`,
    );
    message.channel.send(embed);*/
};
