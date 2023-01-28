const { SlashCommandBuilder } = require("@discordjs/builders");
const { search } = require("../subcommands/cripto/search");
const { list } = require("../subcommands/cripto/list");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cripto")
    .setDescription("search method")
    .addSubcommand((subcommand) =>
      subcommand.setName("list").setDescription("search for an image")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("search")
        .setDescription("find the lyrics of a song")
        .addStringOption((option) =>
          option
            .setName("text")
            .setDescription("name of the song")
            .setRequired(true)
        )
    ),

  async run(client, interaction) {
    if (interaction.options._subcommand === "list") list(interaction);
    else if (interaction.options._subcommand === "search") search(interaction);
    
  },
};
