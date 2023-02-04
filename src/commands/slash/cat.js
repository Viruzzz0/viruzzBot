const { SlashCommandBuilder } = require("@discordjs/builders");
const { catSay } = require("../subcommands/cat/catSay");
const { catRandom } = require("../subcommands/cat/catRandom");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cat")
    .setDescription("Devuelve una imagen random de un gato :D")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("say")
        .setDescription("search for an image")
        .addStringOption((option) =>
          option
            .setName("text")
            .setDescription("Enter a text")
            .setRequired(true)
        )
        .addIntegerOption((option) =>
          option
            .setName("resolution")
            .setDescription("Enter a text")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("random")
        .setDescription("search for an image")
    ),

  async run(client, interaction) {
    if (interaction.options._subcommand === "say") catSay(interaction);
    else if (interaction.options._subcommand === "random") catRandom(interaction);
  },
};
