const { SlashCommandBuilder } = require('@discordjs/builders')
const { EmbedBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('listslash')
    .setDescription('Lista de comando del bot'),

  async run (client, interaction) {
    const embed = new EmbedBuilder()
      .setTitle('Lista de slash commands')
      .setColor('blue')
      .setDescription(
        '`ping` \n `mybot` \n `cat` \n `dog` \n `ping` \n `say` \n'
      )
      .setFooter({
        text: 'Usar el slash /'
      })
      .setTimestamp()

    await interaction.reply({
      embeds: [embed]
    })
  }
}
