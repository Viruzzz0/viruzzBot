const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("listslash")
    .setDescription("Lista de comando del bot"),

    async run(client, interaction){

        const embed = new MessageEmbed()
            .setTitle("Lista de slash commands")
            .setColor('RANDOM')
            .setDescription('`ping` \n `mybot` \n `count` \n `cripto` \n `bitcoin` \n `button` \n `avatar`')
            .setFooter("Usar el slash /")
            .setTimestamp()

        interaction.reply({ 
            embeds: [embed],
        });
    }
}