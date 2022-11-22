// npx nodemon index.js

// leer slash "node slashcommands"


// Otra forma de darle delay a una respuesta
// https://discordjs.guide/interactions/slash-commands.html#ephemeral-responses

/*
const wait = require('node:timers/promises').setTimeout;

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
		await wait(2000);
		await interaction.editReply('Pong again!');
	}
});
*/

// --------------------------------

/*
? Ideas para el bot


* - alarma
*
! - medir actividad en discord de usuario 
*
* - convetor de tiempo (complete)
*
*
*
*
*
*
*
*
*
*
*
*
*/


const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("searchImage")
    .setDescription("Busca Imagenes")
    .addStringOption(option =>
      option.setName('image')
        .setDescription('enter image')
        .setRequired(true)),

  async run(client, interaction) {
    
    await interaction.reply({
      content: `image message`,
    });
  },
};
