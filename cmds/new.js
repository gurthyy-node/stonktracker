const Discord = require('discord.js');
const _ = require('lodash');
const rcolor = require('rcolor');
const PastebinAPI = require('pastebin-js');

pastebin = new PastebinAPI(`${process.env.PASTEBIN_API}`);

module.exports = {
  name: 'new',
  aliases: [],
  description: `Submit a Due Diligence Report. Use: **${process.env.PREFIX}new [Company Name] [Pastebin URL]**`,
  args: true,
  displayInHelp: true,
  execute(message, args) {
    message.delete();
    if (!args[1].startsWith('https://pastebin.com/')) {
      message
        .reply(
          'Please submit a valid Pastebin link by going to https://pastebin.com.',
        )
        .then(message.delete(10000));
      return;
    }
    let name = args[0];
    let url = args[1];
    let pbCode = url.substring('https://pastebin.com/'.length);

    pastebin.getPaste(pbCode).then(function (data) {
      if (data.length >= 2048) {
        data = data.substring(0, 1000);
      }
      //console.log(data);
      // Build embed
      let embed = new Discord.MessageEmbed();
      embed.setTitle('Report on ' + name);
      embed.setColor(rcolor());

      embed.setFooter('Submitted by: ' + message.author.username);
      embed.setDescription(
        'Read full report at: ' + url + `\n` + '```' + data + '....```',
      );

      message.channel.send(embed).then((embedMessage) => {
        embedMessage.react('👍');
        embedMessage.react('👎');
      });
    });
  },
};

//.then(() => embed.react('👍'))
//.then(() => embed.react('👎'))
//.catch(console.log('Failed to add emotes to message'));
