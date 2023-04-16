const { REST } = require('@discordjs/rest')
const { Routes } = require('discord.js')
const { clientId } = require('../config.json')
const fs = require('node:fs')
const dotenv = require('dotenv')
dotenv.config()

const commands = []
const commandFiles = fs.readdirSync('./src/commands/slash').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
  const command = require(`./src/commands/slash/${file}`)
  if ('data' in command && 'run' in command) {
    commands.push(command.data.toJSON())
  } else {
    console.log(`[WARNING] The command at ${file} is missing a required "data" or "execute" property.`)
  }
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`)

    const data = await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands }
    )

    console.log(`Successfully reloaded ${data.length} application (/) commands.`)
  } catch (error) {
    console.error(error)
  }
})()
