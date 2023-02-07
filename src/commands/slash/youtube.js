const { SlashCommandBuilder } = require('@discordjs/builders')
const { getVideo } = require('../subcommands/youtube/getVideo')
const { getVideoFull } = require('../subcommands/youtube/getVideoFull')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('youtube')
    .setDescription('search method')
    .addSubcommand((subcommand) =>
      subcommand
        .setName('get_video')
        .setDescription('search for an image')
        .addStringOption((option) =>
          option.setName('url').setDescription('Enter a url').setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('get_video_full')
        .setDescription('search for an image')
        .addStringOption((option) =>
          option.setName('url').setDescription('Enter a url').setRequired(true)
        )
    ),
  async run (client, interaction) {
    if (interaction.options._subcommand === 'get_video') getVideo(interaction)
    else if (interaction.options._subcommand === 'get_video_full') getVideoFull(interaction)
  }
}
