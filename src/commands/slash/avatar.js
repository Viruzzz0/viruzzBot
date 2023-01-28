const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("The bot sends a message to a user (anonymous)")
    .addMentionableOption((option) =>
      option
        .setName("user")
        .setDescription("The user to whom the message is sent")
        .setRequired(true)
    ),
    async run(client, interaction) {
     
      const mention = interaction.options.getMentionable("user");
      const embed = new EmbedBuilder()
      .setTitle(`Avatar de ${mention.tag}`)
      .setImage(mention.displayAvatarURL({ size: 1024, dynamic: true }))
      .setTimestamp();

  
      await interaction.reply({ embeds: [embed] });
    },
}