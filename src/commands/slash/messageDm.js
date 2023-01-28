const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("send")
    .setDescription("The bot sends a message to a user (anonymous)")
    .addStringOption((option) =>
      option
        .setName("msg")
        .setDescription("Enter the message")
        .setRequired(true)
    )
    .addMentionableOption((option) =>
      option
        .setName("user")
        .setDescription("The user to whom the message is sent")
        .setRequired(true)
    ),

  async run(client, interaction) {
    const msg = interaction.options.getString("msg");
    const mention = interaction.options.getMentionable("user");

    client.users.send(mention.user.id, msg);

    await interaction.reply({
      content: `Your message has been sent to ${mention}`,
      ephemeral: true,
    });
  },
};
