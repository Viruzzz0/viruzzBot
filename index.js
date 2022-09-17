const Discord = require("discord.js");
const config = require("./config.json");
// const intents = new Discord.Intents(131071);
// const client = new Discord.Client({ intents });
const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});
const fs = require("fs");
const { log } = require("console");

// Functions que carga los comandos Handler

client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./cmdHandler")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./cmdHandler/${file}`);
  client.commands.set(command.name, command);
  // console.log(command);
  const commandName = file.split("."[0]);
}

// Function que carga los slashcommands

client.slashcommands = new Discord.Collection();
const slashcommandsFiles = fs
  .readdirSync("./slashcmd")
  .filter((file) => file.endsWith(".js"));

for (const file of slashcommandsFiles) {
  const slash = require(`./slashcmd/${file}`);
  // console.log(`Slash command - ${file} cargado.`)
  client.slashcommands.set(slash.data.name, slash);
}

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const slashcmds = client.slashcommands.get(interaction.commandName);

  if (!slashcmds) return;

  try {
    await slashcmds.run(client, interaction);
  } catch (err) {
    console.error(err);
  }
});

client.on("messageCreate", async (message) => {
  let prefix = "-";

  if (!message.content.startsWith(prefix)) return;
  if (message.author.bot) return;

  const usuario = message.mentions.members.first() || message.member;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  let cmd = client.commands.find(
    (c) => c.name === command || (c.alias && c.alias.includes(command))
  );
  if (cmd) {
    cmd.execute(client, message, args);
  }
});
client.on("ready", (async) => {
  console.log(`Bot is ready as ${client.user.tag}`);
  client.user.setStatus("idle");

  // mensaje directo a el canal bot

  // client.channels.cache.get("834250914096611368").send({ content: `cerra el orto` })
});

client.login(config.token);
