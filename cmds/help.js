const Discord = require('discord.js');
const _ = require('lodash');
const rcolor = require('rcolor');

module.exports = {
  name: 'help',
  description: 'List all currently available commands.',
  aliases: ['h', 'commands'],
  displayInHelp: true,
  execute(message, args) {
    const { cmds } = message.client;

    let embed = new Discord.MessageEmbed();
    embed.setTitle(`DD Bot Help`);
    embed.setDescription('List all currently available commands.');
    embed.setColor(rcolor());
    embed.setThumbnail(message.client.user.displayAvatarURL());
    cmds.forEach((command) => {
      if (!command.displayInHelp) return;
      if (!command.aliases.length) {
        embed.addField(
          '**' + command.name + '**',
          '\n ' + command.description,
          true,
        );
      } else {
        let formatedAliases = command.aliases.join(', ');
        embed.addField(
          '**' + command.name + '**',
          command.description + '\n``' + 'Aliases: ' + formatedAliases + '``',
          true,
        );
      }
    });
    embed.setFooter('Requested by: ' + message.author.username);
    message.channel.send(embed);
  },
};
