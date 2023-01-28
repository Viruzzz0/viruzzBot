const SearchImage = require("../../../servers/bingImg").SearchImage;
const ToggleEmbed = require("../../../tools/toggleEmbed").ToggleEmbed;
const {
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} = require("discord.js");

async function image(interaction) {
  const msg = interaction.options.getString("text");
  const getImageObj = new SearchImage({ textImg: msg, count: 8 });
  const getImage = await getImageObj.petition();

  // Embed
  const embed = new EmbedBuilder()
    .setTitle(getImage.nameImg)
    .setColor("Random")
    .setImage(getImage.images[0])
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

  const message = await interaction.reply({
    content: `image message ${msg}`,
    components: [row],
    embeds: [embed],
  });
  const ifilter = (i) => i.user.id === interaction.user.id;
  const collector = message.createMessageComponentCollector({
    filter: ifilter,
    time: 120000,
  });

  let count = 0;
  const toggleImage = new ToggleEmbed({
    embed: embed,
    actionRow: row,
    images: getImage.images,
  });
  const toggle = await toggleImage.action(count);

  // ! Evento al accionar un button
  collector.on("collect", async (collect) => {
    toggleImage.collector = collect;
    await toggle.on();
  });

  collector.on("end", (collected) =>
    console.log(`Collected ${collected.size} items`)
  );
}

module.exports.image = image;
