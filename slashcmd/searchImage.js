const SearchImage = require("../fetch/bingImg").SearchImage;
const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} = require("discord.js");

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
    ),

  async run(client, interaction) {
    const msg = interaction.options.getString("text");
    const getImageObj = new SearchImage({ textImg: msg, count: 5 });
    const getImage = await getImageObj.petition();
    const embed = new EmbedBuilder()
      .setTitle(getImage.nameImg)
      .setColor("Random")
      .setImage(getImage.images[0])
      .setFooter({
        text: "Image 1",
      })
      .setTimestamp();
    const buttonNext = new ButtonBuilder()
      .setCustomId("next")
      .setLabel("->")
      .setStyle(ButtonStyle.Primary);

    await interaction.reply({
      content: `image message ${msg}`,
      embeds: [embed],
      ephemeral: true,
    });
  },
};
