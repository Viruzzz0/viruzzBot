const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const { token, clientId, guildId } = require('./config.json');

const fs = require('node:fs');

const commands = [];
const commandFiles = fs.readdirSync('./src/commands/slash').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./src/commands/slash/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();