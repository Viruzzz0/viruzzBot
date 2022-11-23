const ToggleEmbed = require("../tools/toggleEmbed").ToggleEmbed;
const {
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  name: "test",
  alias: ["t"],

  async execute(client, message, args) {
    const img1 =
      "https://assets.mofoprod.net/network/images/discord.width-250.jpg";
    const img2 =
      "https://www.trecebits.com/wp-content/uploads/2020/12/Que-es-Discord.jpg";
    const img3 =
      "https://phantom-marca.unidadeditorial.es/ebb126757255d08caf5fec8985cea583/resize/1320/f/jpg/assets/multimedia/imagenes/2021/05/03/16200681608378.jpg";
    const img4 = "https://discordjs.guide/meta-image.png";
    const img5 = "https://miro.medium.com/max/500/1*DhlEHM0sZs1DKEoBc40ldQ.png";

    const embed = new EmbedBuilder()
      .setTitle("test")
      .setColor("Random")
      .setImage(img1)
      .setFooter({
        text: "Image 0",
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
    const m = await message.channel.send({
      content: "Precious",
      components: [row],
      embeds: [embed],
    });
    const ifilter = (i) => i.user.id === message.author.id;
    const collector = m.createMessageComponentCollector({
      filter: ifilter,
      time: 120000,
    });

    let num = 0;
    const toggleImage = await new ToggleEmbed({
      embed: embed,
      actionRow: row,
      images: [img1, img2, img3, img4, img5],
    });
    const repi = await toggleImage.action(num)
    

    collector.on("collect", async (i) => {
      toggleImage.collector = i
      await repi.countNum()

    });

    collector.on("end", (collected) =>
      console.log(`Collected ${collected.size} items`)
    );
  },
};
