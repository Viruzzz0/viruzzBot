const Discord = require("discord.js");
const config = require("./config.json");
const fs = require("fs");
const { log } = require("console");
const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});
const logCommand = (i) => {
  console.log({
    user: i.author.username,
    content: i.content,
    id: i.author.id,
  });
};

client.on("ready", async (async) => {
  client.user.setStatus("invisible");
});

// !Functions que carga los comandos Handler

client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./src/commands/handler")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./src/commands/handler/${file}`);
  client.commands.set(command.name, command);
  // console.log(command);
  const commandName = file.split("."[0]);
}

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
  logCommand(message);
});

// !Function que carga los slashcommands

client.slashcommands = new Discord.Collection();
const slashcommandsFiles = fs
  .readdirSync("./src/commands/slash")
  .filter((file) => file.endsWith(".js"));

for (const file of slashcommandsFiles) {
  const slash = require(`./src/commands/slash/${file}`);
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
  console.log({
    user: interaction.user.username,
    command: interaction.commandName,
    id: interaction.user.id,
  });
});

// ? bot ready

client.on("ready", (async) => {
  console.log(`Bot is ready as ${client.user.tag}`);
  // mensaje directo a el canal bot
  // client.channels.cache.get("834250914096611368").send({ content: `cerra el orto` })
});
client.on("message", (message) => {
  if (message.channel.type === "dm") {
    // put your code here
    console.log(message.content);
  }
});

client.login(config.token);
