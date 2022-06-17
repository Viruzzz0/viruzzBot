const Discord = require('discord.js');
const config = require("./config.json");
const intents = new Discord.Intents(131071);
const client = new Discord.Client({ intents });
const fs = require('fs');

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./cmdHandler").filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./cmdHandler/${file}`);
	client.commands.set(command.name, command);
	
    const commandName = file.split('.'[0])
}

client.on('messageCreate', async message => {

    let prefix = '-';

    if (!message.content.startsWith(prefix)) return;
    if (message.author.bot) return;
        
    const usuario = message.mentions.members.first() || message.member;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command));
    if (cmd) {
        cmd.execute(client, message, args);
    }
});

client.login(config.token);