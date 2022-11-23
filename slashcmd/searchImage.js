// const SearchImage = require("../fetch/bingImg").SearchImage;
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
    const img1 =
      "https://assets.mofoprod.net/network/images/discord.width-250.jpg";
    const img2 =
      "https://www.trecebits.com/wp-content/uploads/2020/12/Que-es-Discord.jpg";
    const img3 =
      "https://phantom-marca.unidadeditorial.es/ebb126757255d08caf5fec8985cea583/resize/1320/f/jpg/assets/multimedia/imagenes/2021/05/03/16200681608378.jpg";
    const img4 = "https://discordjs.guide/meta-image.png";
    const img5 = "https://miro.medium.com/max/500/1*DhlEHM0sZs1DKEoBc40ldQ.png";
    const searchText = "name-img";

    const msg = interaction.options.getString("text");
    // const getImageObj = new SearchImage({ textImg: msg, count: 5 });
    // const getImage = await getImageObj.petition();
    const embed = new EmbedBuilder()
      .setTitle("test")
      // .setTitle(getImage.nameImg)
      .setColor("Random")
      .setImage(
        "https://media.npr.org/assets/img/2021/08/11/gettyimages-1279899488_wide-f3860ceb0ef19643c335cb34df3fa1de166e2761-s1100-c50.jpg"
      )
      // .setImage(getImage.images[0])
      .setFooter({
        text: "Image 1",
      })
      .setTimestamp();
    const buttonNext = new ButtonBuilder()
      .setCustomId("next")
      .setLabel("->")
      .setStyle(ButtonStyle.Primary);
    const buttonPreview = new ButtonBuilder()
      .setCustomId("preview")
      .setLabel("<-")
      .setStyle(ButtonStyle.Primary);
    const row = new ActionRowBuilder().addComponents(buttonPreview, buttonNext);

    const message = await interaction.reply({
      content: `image message ${msg}`,
      components: [row],
      embeds: [embed],
      // ephemeral: true,
    });
    const ifilter = (i) => i.user.id === message.author.id;
    const collector = message.createMessageComponentCollector({
      filter: ifilter,
      time: 120000,
    });

    collector.on("collect", async (i) => {
      console.log("lol collect");

      // async function toggleImage(collector, next, preview) {
      //   if (collector.customId === next) {
      //     await i.deferUpdate();

      //   }
      // }

      // if (i.customId === "returnImg1") {
      //   await i.deferUpdate();
      //   embed.setImage(getImage.images[0]);
      //   embed.setFooter({
      //     text: "Image 1",
      //   });
      //   buttonGo.setCustomId("goImg2");

      //   i.editReply({
      //     embeds: [embed],
      //     components: [row],
      //   });
      // } else if (i.customId === "goImg3") {
      //   await i.deferUpdate();
      //   embed.setImage(getImage.images[2]);
      //   embed.setFooter({
      //     text: "Image 3",
      //   });
      //   buttonReturn.setCustomId("returnImg2");
      //   buttonGo.setCustomId("goImg4");

      //   i.editReply({
      //     embeds: [embed],
      //     components: [row],
      //   });
      // }

    });
    collector.on("end", (collected) =>
      console.log(`Collected ${collected.size} items`)
    );
  },
};
