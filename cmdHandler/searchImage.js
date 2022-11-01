const axios = require("axios");
const {
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} = require("discord.js");

// const img1 = "https://assets.mofoprod.net/network/images/discord.width-250.jpg";
// const img2 =
//   "https://www.trecebits.com/wp-content/uploads/2020/12/Que-es-Discord.jpg";
// const img3 =
//   "https://phantom-marca.unidadeditorial.es/ebb126757255d08caf5fec8985cea583/resize/1320/f/jpg/assets/multimedia/imagenes/2021/05/03/16200681608378.jpg";
// const img4 = "https://discordjs.guide/meta-image.png";
// const img5 = "https://miro.medium.com/max/500/1*DhlEHM0sZs1DKEoBc40ldQ.png";
// const searchText = "name-img";

module.exports = {
  name: "img",
  alias: [],

  async execute(client, message, args) {
    const mensaje = args.join(" ");
    if (!mensaje) return message.channel.send("Escribe algo");

    let textImg = mensaje;
    console.log(textImg);

    const options = {
      method: "GET",
      url: "https://bing-image-search1.p.rapidapi.com/images/search",
      params: { q: textImg, count: "5" },
      headers: {
        "X-RapidAPI-Key": "53351dee31msh305061050cf7042p17eaedjsnc91dc9d740c5",
        "X-RapidAPI-Host": "bing-image-search1.p.rapidapi.com",
      },
    };

    const response = await axios(options);

    const img1 = response.data.value[0].contentUrl;
    const img2 = response.data.value[1].contentUrl;
    const img3 = response.data.value[2].contentUrl;
    const img4 = response.data.value[3].contentUrl;
    const img5 = response.data.value[4].contentUrl;
    const searchText = response.data.queryContext.originalQuery;

    const embed = new EmbedBuilder()
      .setTitle(searchText)
      .setColor("Random")
      .setImage(img1)
      .setFooter({
        text: "Image 1",
      })
      .setTimestamp();

    const buttonGo = new ButtonBuilder()
      .setCustomId("goImg2")
      .setLabel("->")
      .setStyle(ButtonStyle.Primary);

    const buttonReturn = new ButtonBuilder()
      .setCustomId("returnImg1")
      .setLabel("<-")
      .setStyle(ButtonStyle.Primary);

    // Se pasa el button creado como components a row
    const row = new ActionRowBuilder().addComponents(buttonReturn, buttonGo);

    // Envia el mensaje con el component ActionRow
    const m = await message.channel.send({
      content: "Precious",
      components: [row],
      embeds: [embed],
    });

    // El ifilter le agrega un filtro al el button, en este caso solo funciona para el autor del mensaje
    // Retorna un InteractionCollector
    const ifilter = (i) => i.user.id === message.author.id;
    const collector = m.createMessageComponentCollector({
      filter: ifilter,
      time: 60000,
    });

    collector.on("collect", async (i) => {
      // Primer buttonGo que se utiliza
      // ! PRIMERA IMAGEN
      if (i.customId === "goImg2") {
        await i.deferUpdate();
        embed.setImage(img2);
        embed.setFooter({
          text: "Image 2",
        });
        buttonGo.setCustomId("goImg3");

        i.editReply({
          embeds: [embed],
          components: [row],
        });
      }

      // Aqui lo mismo que el anterio solo habilita
      // el previous1 si es que se preciona
      // ! SEGUNDA IMAGEN
      if (i.customId === "returnImg1") {
        await i.deferUpdate();
        embed.setImage(img1);
        embed.setFooter({
          text: "Image 1",
        });
        buttonGo.setCustomId("goImg2");

        i.editReply({
          embeds: [embed],
          components: [row],
        });
      } else if (i.customId === "goImg3") {
        await i.deferUpdate();
        embed.setImage(img3);
        embed.setFooter({
          text: "Image 3",
        });
        buttonReturn.setCustomId("returnImg2");
        buttonGo.setCustomId("goImg4");

        i.editReply({
          embeds: [embed],
          components: [row],
        });
      }

      // ! TERCERA IMAGEN

      if (i.customId === "returnImg2") {
        await i.deferUpdate();
        embed.setImage(img2);
        embed.setFooter({
          text: "Image 2",
        });
        buttonReturn.setCustomId("returnImg1");
        buttonGo.setCustomId("goImg3");

        i.editReply({
          embeds: [embed],
          components: [row],
        });
      } else if (i.customId === "goImg4") {
        await i.deferUpdate();
        embed.setImage(img4);
        embed.setFooter({
          text: "Image 4",
        });
        buttonReturn.setCustomId("returnImg3");
        buttonGo.setCustomId("goImg5");

        i.editReply({
          embeds: [embed],
          components: [row],
        });
      }

      // ! CUARTA IMAGEN

      if (i.customId === "returnImg3") {
        await i.deferUpdate();
        embed.setImage(img3);
        embed.setFooter({
          text: "Image 3",
        });
        buttonReturn.setCustomId("returnImg2");
        buttonGo.setCustomId("goImg4");

        i.editReply({
          embeds: [embed],
          components: [row],
        });
      } else if (i.customId === "goImg5") {
        await i.deferUpdate();
        embed.setImage(img5);
        embed.setFooter({
          text: "Image 5",
        });
        buttonReturn.setCustomId("returnImg4");

        i.editReply({
          embeds: [embed],
          components: [row],
        });
      }

      // ! QUINTA IMAGEN

      if (i.customId === "returnImg4") {
        await i.deferUpdate();
        embed.setImage(img4);
        embed.setFooter({
          text: "Image 4",
        });
        buttonReturn.setCustomId("returnImg3");
        buttonGo.setCustomId("goImg5");

        i.editReply({
          embeds: [embed],
          components: [row],
        });
      }
    });
// TODO fix this
    collector.on("end", (collected) =>
      console.log(`Collected ${collected.size} items`)
    );
  },
};
