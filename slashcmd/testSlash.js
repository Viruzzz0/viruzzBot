const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping2")
    .setDescription("El sdajkjidgskjgdsk"),

  async run(client, interaction) {
    interaction.reply({
      content: `Pong! **${client.ws.ping}**`,
    });
  },
};
