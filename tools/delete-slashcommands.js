const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const { clientId, guildId } = require('../config.json')
const dotenv = require('dotenv')
dotenv.config()

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)
rest.get(Routes.applicationGuildCommands(clientId, guildId))
  .then(data => {
    const promises = []
    for (const command of data) {
      const deleteUrl = `${Routes.applicationGuildCommands(clientId, guildId)}/${command.id}`
      promises.push(rest.delete(deleteUrl))
    }
    return Promise.all(promises)
  })
  .catch(err => console.error(err))
