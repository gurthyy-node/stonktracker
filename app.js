console.log(`======== Starting StonkTracker ========`);
const Discord = require('discord.js');

const dotenv = require('dotenv');
dotenv.config();
const prefix = process.env.PREFIX;
const request = require('request');
const rcolor = require('rcolor');
const fs = require('fs');
const _ = require('lodash');

// Stock API Creation
const finnhub = require('finnhub');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.STOCK_API_TOKEN;
const finnhubClient = new finnhub.DefaultApi();

let tickers = [];
let today = new Date();

/***********************************************************
 *******************  Discord Bot Setup  *******************
 ***********************************************************/

//Create bot client and register commands from the 'cmds' folder
const bot = new Discord.Client(); // [partials: ['MESSAGE', 'REACTION', 'USER']]
bot.cmds = new Discord.Collection();

const commandFiles = fs
  .readdirSync('./cmds')
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./cmds/${file}`);
  bot.cmds.set(command.name, command);
}

//When ready, log on, build invite link and set initial activity.
bot.on('ready', async function () {
  console.log(`Logged in as ${bot.user.tag}`);

  bot.user.setActivity('all the stonks', { type: 'WATCHING' });

  //let minLink = await bot.generateInvite(67431424);
  //let maxLink = await bot.generateInvite('ADMINISTRATOR');
  //console.log('Invite with Minimal permissions: ' + minLink);
  //console.log('Invite with Full Admin: ' + maxLink);
});

/*********************************************************
 ***************  Main Message Handler  ******************
 *********************************************************/

bot.on('message', async (message) => {
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  if (!message.content.startsWith(prefix)) return;
  const command =
    bot.cmds.get(commandName) ||
    bot.cmds.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) {
    return message.reply(
      `This command doesn't exist. Use **${process.env.PREFIX}help** to see all commands.`,
    );
  }

  if (
    command.adminOnly &&
    !message.member.roles.cache.has('740824960896860160')
  ) {
    return message.reply('You do not have access to this command. Sorry!');
  }

  if (command.args && !args.length) {
    return message.channel.send(
      `You forgot to enter something. Use **${process.env.PREFIX}help** to see usage details.`,
    );
  }

  try {
    command.execute(message, args, bot);
  } catch (e) {
    console.error(e);
    message.reply(
      'There was an issue running this command. Please try again later.',
    );
  }
});

/***************************************************
 ******************* GME Ticker ********************
 ***************************************************/

//Create bot client and register commands from the 'cmds' folder
const gme = new Discord.Client(); // [partials: ['MESSAGE', 'REACTION', 'USER']]

//When ready, log on, build invite link and set initial activity.
gme.on('ready', async function () {
  console.log(`Logged in as ${gme.user.tag}`);

  gme.user.setActivity('$GME - GameStop', { type: 'WATCHING' });
  tickers.push('GME');
  console.log(tickers);
  updateNicknames(tickers);

  /*let minLink = await gme.generateInvite(67431424);
  let maxLink = await bot.generateInvite('ADMINISTRATOR');
  console.log('Invite GME with Minimal permissions: ' + minLink);
  console.log('Invite with Full Admin: ' + maxLink);*/
});

/***************************************************
 ****************  Nickname Updates  ***************
 ***************************************************/
//GME
getPrice('GME', async function (price) {
  (await gme.guilds.fetch('602939070502666250')).me.setNickname(`$` + price);
  console.log(price);
});

/***************************************************
 *******************  Bot Logins  ******************
 ***************************************************/

// Main Bot
bot.login(process.env.BOT_TOKEN);

//GME Ticket
gme.login(process.env.GME_TOKEN);

/***************************************************
 *******************  Functions  *******************
 ***************************************************/

function getPrice(symbol, callback) {
  finnhubClient.quote(symbol, (error, data, response) => {
    console.log(data.c);
  });

  // finalPrice = (Math.round(price * 1000) / 1000).toFixed(2);
  // return callback(finalPrice);
}

function updateNicknames(tickers) {
  tickers.forEach((symbol) => {});
}
