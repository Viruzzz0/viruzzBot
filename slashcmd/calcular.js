const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("cal")
    .setDescription("El suma, resta")
    .addNumberOption(option => option.setName('num').setDescription('Inserte el numb1').setRequired(true))
    .addNumberOption(option => option.setName('num').setDescription('Inserte el numb2').setRequired(true)),

    
    async run(client, interaction){
        const num1 = interaction.options.getNumber('NUMBER')
        const num2 = interaction.options.getNumber('NUMBER')
        const sumar = (num1, num2) =>{
            return num1 + num2;
        }
        interaction.reply({ 
            content: `es **${sumar()}**`
        });
    }
}

