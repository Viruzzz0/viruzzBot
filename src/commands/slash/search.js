const { SlashCommandBuilder } = require("@discordjs/builders");
const { lyrics } = require("../subcommands/search/lyrics");
const { image } = require("../subcommands/search/image");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("search")
    .setDescription("search method")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("image")
        .setDescription("search for an image")
        .addStringOption((option) =>
          option
            .setName("text")
            .setDescription("Enter a text")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("lyrics")
        .setDescription("find the lyrics of a song")
        .addStringOption((option) =>
          option
            .setName("text")
            .setDescription("name of the song")
            .setRequired(true)
        )
    ),

  async run(client, interaction) {
    if (interaction.options._subcommand === "image") image(interaction);
    else if (interaction.options._subcommand === "lyrics") lyrics(interaction);
  },
};
