console.log(`======== Starting StonkTracker ========`);
const Discord = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();
const prefix = process.env.PREFIX;
const rcolor = require('rcolor');
const fs = require('fs');
const _ = require('lodash');
const yahoo = require('yahoo-financial-data');

// Server Arrays
let botServers = [];
let gmeServers = [];
let woofServers = [];

var hour = new Date().getHours();
if (hour >= 6 && hour <= 13) {
  setInterval(autoUpdate, 2000);
}

/***********************************************************
 *********************  Main Bot Setup  ********************
 ***********************************************************/
const bot = new Discord.Client();
bot.cmds = new Discord.Collection();

const commandFiles = fs
  .readdirSync('./cmds')
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./cmds/${file}`);
  bot.cmds.set(command.name, command);
}

bot.on('ready', async function () {
  console.log(`Logged in as ${bot.user.tag}`);

  bot.user.setActivity('all the stonks', { type: 'WATCHING' });

  bot.guilds.cache.forEach((server) => {
    botServers.push(server.id);
  });

  //let inviteLink = await bot.generateInvite(201714752);
  //console.log('Invite to server: ' + inviteLink);
});

/*********************************************************
 ***************  Main Message Handler  ******************
 *********************************************************/

bot.on('message', async (message) => {
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;
  if (message.content === '.') return;
  let sender = message.author;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  if (!message.content.startsWith(prefix)) return;
  const command =
    bot.cmds.get(commandName) ||
    bot.cmds.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

  if (command.args && !args.length) {
    return message.channel.send(
      `You forgot to enter something. Use **${process.env.PREFIX}help** to see usage details.`,
    );
  }
  console.log(message.channel);

  try {
    command.execute(message, args, bot);
  } catch (e) {
    console.error(e);
    message.reply(
      'There was an issue running this command. Please try again later.',
    );
  }

  /**************** Reputation System *****************/

  var userData = JSON.parse(fs.readFileSync('Storage/userData.json', utf8));

  if (!userData[sender.id])
    userData[sender.id] = {
      messagesSent: 0,
    };

  userData[sender.id].messagesSent++;

  fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
    if (err) console.error(err);
  });
});

/***************************************************
 ******* Global Reaction Handler (Best Of) *********
 ***************************************************/

/***************************************************
 *******************  Bot Logins  ******************
 ***************************************************/

// Main Bot
bot.login(process.env.BOT_TOKEN);

/***************************************************
 *******************  Functions  *******************
 ***************************************************/

function getPrice(symbol, callback) {
  yahoo.price(symbol, function (err, data) {
    price = (Math.round(data * 1000) / 1000).toFixed(2);
    //console.log(symbol + ' price updated to $' + price);
    return callback(price);
  });
}
