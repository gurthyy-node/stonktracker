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

  let inviteLink = await bot.generateInvite(201714752);
  console.log('Invite to server: ' + inviteLink);
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
    !message.member.roles.cache.has(process.env.ADMIN_ROLE)
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
const gme = new Discord.Client();

gme.on('ready', async function () {
  console.log(`Logged in as ${gme.user.tag}`);

  gme.guilds.cache.forEach((server) => {
    gmeServers.push(server.id);
  });

  gme.user.setActivity('$GME - GameStop', { type: 'WATCHING' });
  updateGME();

  //let inviteLink = await gme.generateInvite(201714752);
  //console.log('Invite gme to server: ' + inviteLink);
});

/***************************************************
 ******************* WOOF Ticker *******************
 ***************************************************/
const woof = new Discord.Client();

woof.on('ready', async function () {
  console.log(`Logged in as ${woof.user.tag}`);

  woof.guilds.cache.forEach((server) => {
    woofServers.push(server.id);
  });

  woof.user.setActivity('$WOOF - Petco Health and Wellness', {
    type: 'WATCHING',
  });
  updateWoof();

  //let inviteLink = await woof.generateInvite(201714752);
  //console.log('Invite woof to server: ' + inviteLink);
});

/***************************************************
 ****************  Nickname Updates  ***************
 ***************************************************/
//GME
async function updateGME() {
  getPrice('GME', async function (price) {
    gmeServers.forEach(async function (server) {
      (await gme.guilds.fetch(server)).me.setNickname(`1) $` + price);
    });
  });
}

//Woof
async function updateWoof() {
  getPrice('WOOF', async function (price) {
    woofServers.forEach(async function (server) {
      (await woof.guilds.fetch(server)).me.setNickname(`2) $` + price);
    });
  });
}

/***************************************************
 *******************  Bot Logins  ******************
 ***************************************************/

// Main Bot
bot.login(process.env.BOT_TOKEN);

//GME Ticker
//gme.login(process.env.GME_TOKEN);

//WOOF Ticker
//woof.login(process.env.WOOF_TOKEN);

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

function autoUpdate() {
  updateGME();
  updateWoof();
}
