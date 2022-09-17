const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("listslash")
    .setDescription("Lista de comando del bot"),

  async run(client, interaction) {
    const embed = new EmbedBuilder()
      .setTitle("Lista de slash commands")
      .setColor("Gold")
      .setDescription(
        "`ping` \n `mybot` \n `count` \n `cripto` \n `bitcoin` \n `button` \n `avatar`"
      )
      .setFooter({
        text: "Usar el slash /",
      })
      .setTimestamp();

    console.log(embed);  
    
    interaction.reply({
      embeds: [embed],
    });
  },
};
