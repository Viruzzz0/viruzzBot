const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("#############")
    .addStringOption((option) =>
      option
        .setName("value")
        .setDescription("#######")
        .setRequired(true)
    )
    .addMentionableOption((option) =>
      option
        .setName("value2")
        .setDescription("#######")
        .setRequired(true)
    ),

  async run(client, interaction) {
    if (interaction.user.id === '867251021984956448') {
      
      const msg = interaction.options.getString("value");
      const mention = interaction.options.getMentionable("value2");
  
      client.users.send(mention.user.id, msg);
  
      await interaction.reply({
        content: `Your message has been sent to ${mention}`,
        ephemeral: true,
      });

    }
  },
};
