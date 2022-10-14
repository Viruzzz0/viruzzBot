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

module.exports = {
  name: "test",
  alias: ["t"],

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

    // message.channel.send({ content: res });

    const embed = new EmbedBuilder()
      .setTitle(searchText)
      .setColor("Random")
      .setImage(img1)
      .setFooter({
        text: "Image 1",
      })
      .setTimestamp();

    const button = new ButtonBuilder()
      .setCustomId("b1")
      .setLabel("button")
      .setStyle(ButtonStyle.Primary);

    // Se pasa el button creado como components a row
    const row = new ActionRowBuilder().addComponents(button);

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
    const collector2 = m.createMessageComponentCollector({
      filter: ifilter,
      time: 60000,
    });

    collector.on("collect", async (i) => {
      if (i.customId === "b1") {
        await i.deferUpdate();
        embed.setImage(img2);
        embed.setFooter({
          text: "Image 2",
        })
        button.setCustomId("b2");

        i.editReply({
          embeds: [embed],
          components: [row],
        });
      }

      if (i.customId === "b2") {
        await i.deferUpdate();
        embed.setImage(img3);
        embed.setFooter({
          text: "Image 3",
        })
        button.setCustomId("b3");

        i.editReply({
          embeds: [embed],
          components: [row],
        });
      }

      if (i.customId === "b3") {
        await i.deferUpdate();
        embed.setImage(img4);
        embed.setFooter({
          text: "Image 4",
        })
        button.setCustomId("b4");

        i.editReply({
          embeds: [embed],
          components: [row],
        });
      }
      if (i.customId === "b4") {
        await i.deferUpdate();
        embed.setImage(img5);
        embed.setFooter({
          text: "Image 5",
        })

        i.editReply({
          embeds: [embed],
          components: [],
        });
      }
      
    });

    collector.on("end", (collected) =>
      console.log(`Collected ${collected.size} items`)
    );
  },
};
