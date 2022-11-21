const { SlashCommandBuilder } = require("@discordjs/builders");
const embedMesagge = require("../embeds/embed-basic");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("#############")
    .addStringOption((option) =>
      option.setName("value").setDescription("#######").setRequired(true)
    )
    .addMentionableOption((option) =>
      option.setName("value2").setDescription("#######").setRequired(true)
    ),

  async run(client, interaction) {
    if (interaction.user.id === "867251021984956448") {
      const msg = interaction.options.getString("value");
      const mention = interaction.options.getMentionable("value2");

      await interaction.channel.send({
        content: "Precious",
      });

      // await interaction.reply({
      //   embeds: [embedMesagge.embed],
      // });
    }
  },
};
