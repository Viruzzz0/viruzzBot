const fs = require('fs');
const Discord = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guild } = require('./config.json');
const commands = [];
const slashcommandFiles = fs.readdirSync("./slashcmd").filter(file => file.endsWith('.js'))

for(const file of slashcommandFiles){
    const slash = require(`./slashcmd/${file}`)
    commands.push(slash.data.toJSON())
}

const rest = new REST({version: "9"}).setToken("ODM0MjQ5MTAxNDE0NzYwNDQ4.G9mc7M.NVTSCOAYROI1PuhWrWk3JO45OPCTVNb8l8GhFk");

createSlash()

async function createSlash(){
    try {
        await rest.put(
            Routes.applicationCommands(clientId), {
                body: commands
            }
        )
        console.log("Slash created successfully");
    } catch (error) {
        console.error(error);
    }
}