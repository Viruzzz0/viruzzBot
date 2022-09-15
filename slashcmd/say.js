const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('El bot responderá con su ping en ms.')
    .addStringOption(option => option.setName('text').setDescription('Inserte el texto').setRequired(true)),

    async run(client, interaction){
        const texto = interaction.options.getString('text')
        await interaction.deferReply()
        
        setTimeout(() => {
            interaction.editReply({ 
                content: `${ texto }`
            })
        }, 2000)
        
    }
}