const { SlashCommandBuilder } = require("@discordjs/builders");
const { get_video } = require("../subcommands/youtube/get_video");
const { get_video_full } = require("../subcommands/youtube/get_video_full");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("youtube")
    .setDescription("search method")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("get_video")
        .setDescription("search for an image")
        .addStringOption((option) =>
          option.setName("url").setDescription("Enter a url").setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("get_video_full")
        .setDescription("search for an image")
        .addStringOption((option) =>
          option.setName("url").setDescription("Enter a url").setRequired(true)
        )
    ),
  async run(client, interaction) {
    if (interaction.options._subcommand === "get_video") get_video(interaction);
    else if (interaction.options._subcommand === "get_video_full") get_video_full(interaction);
  },
};
