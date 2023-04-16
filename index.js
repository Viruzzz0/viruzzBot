const Discord = require('discord.js')
const config = require('./config.json')
const dotenv = require('dotenv')
const fs = require('fs')
const { Client, GatewayIntentBits } = require('discord.js')
const { ServerConnection } = require('./database.js')
const { schemaModelMessage } = require('./models/messageModel')

dotenv.config()
ServerConnection()

console.log('Starting bot... ')

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
})
const logCommand = async (i) => {
  console.log('--------------------------------------------\n', {
    bot: i.author.bot,
    user: `${i.author.username}#${i.author.discriminator}`,
    content: i.content,
    id: i.author.id,
    commandName: await i.interaction ? i.interaction.commandName : null,
    embeds: i.embeds
  })
}

client.on('ready', async (async) => {
  client.user.setStatus('idle')
  // client.user.setStatus("invisible");
})

client.on('messageCreate', async (message) => {
  logCommand(message)

  const DataBase = schemaModelMessage(message.channel.guild.name)
  const newMsg = new DataBase({
    id: message.author.id,
    bot: message.author.bot,
    username: message.author.username,
    discriminator: message.author.discriminator,
    avatar: message.author.avatar,
    channelId: message.channel.id,
    channelName: message.channel.name,
    content: message.content,
    createdTimestamp: message.createdTimestamp,
    embeds: message.embeds,
    commandAction: message.interaction,
    guild: {
      id: message.guild,
      name: message.guild.name,
      icon: message.guild.icon,
      memberCount: message.guild.memberCount,
      preferredLocale: message.guild.preferredLocale
    }
  })

  newMsg
    .save()
    .then(() => console.log('File saved!'))
    .catch(err => console.error('Error saving file', err))
})

// !Functions que carga los comandos Handler

client.commands = new Discord.Collection()
const commandFiles = fs
  .readdirSync('./src/commands/handler')
  .filter((file) => file.endsWith('.js'))

for (const file of commandFiles) {
  const command = require(`./src/commands/handler/${file}`)
  client.commands.set(command.name, command)
  // console.log(command);
  // const commandName = file.split('.'[0])
}

client.on('messageCreate', async (message) => {
  if (!message.content.startsWith(config.prefix)) return
  if (message.author.bot) return

  // const usuario = message.mentions.members.first() || message.member
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

  const cmd = client.commands.find(
    (c) => c.name === command || (c.alias && c.alias.includes(command))
  )
  if (cmd) {
    cmd.execute(client, message, args)
  }
})

// !Function que carga los slashcommands

client.slashcommands = new Discord.Collection()
const slashcommandsFiles = fs
  .readdirSync('./src/commands/slash')
  .filter((file) => file.endsWith('.js'))

for (const file of slashcommandsFiles) {
  const slash = require(`./src/commands/slash/${file}`)
  // console.log(`Slash command - ${file} cargado.`)
  client.slashcommands.set(slash.data.name, slash)
}

client.on('interactionCreate', async (interaction) => {
  if (interaction.isAutocomplete()) {
    const command = interaction.client.slashcommands.get(
      interaction.commandName
    )

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      )
      return
    }

    try {
      await command.autocomplete(interaction)
    } catch (error) {
      console.error(error)
    }
  }

  if (!interaction.isCommand()) return

  const slashcmds = client.slashcommands.get(interaction.commandName)
  if (!slashcmds) return
  try {
    await slashcmds.run(client, interaction)
  } catch (err) {
    console.error(err)
  }
  console.log('--------------------------------------------\n', {
    user: `${interaction.user.username}#${interaction.user.discriminator}`,
    command: interaction.commandName,
    id: interaction.user.id,
    serverName: interaction.member.guild.name
  })
})

// ? bot ready

client.on('ready', (async) => {
  console.log(`Bot is ready as ${client.user.tag}`)
  client.user.setStatus('idle')
  // mensaje directo a el canal bot
  // client.channels.cache.get("834250914096611368").send({ content: `cerra el orto` })
})

client.login(process.env.TOKEN)
