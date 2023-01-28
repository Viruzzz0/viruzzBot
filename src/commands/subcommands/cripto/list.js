const { EmbedBuilder } = require("discord.js");
const axios = require("axios");
const API =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc";
const options = {
  method: "get",
  url: API,
  params: {
    per_page: 31,
    page: 1,
    sparkline: false,
  },
};

async function list(interaction) {
  const criptoList = await axios
    .request(options)
    .then((response) => response.data)
    .catch(function (error) {
      console.error(error);
    });

  const search = (query) => criptoList.filter((item) => item.id === query);

  const btc = search("bitcoin");
  const eth = search("ethereum");
  const bnb = search("binancecoin");
  const sol = search("solana");
  const xmr = search("monero");

  const embed = new EmbedBuilder()
    .setTitle("Popular Criptos")
    .setColor("Gold")
    .setURL("https://www.coingecko.com")
    .setDescription("Precios actuales")
    .addFields([
      {
        name: btc[0].name,
        value: Intl.NumberFormat().format(btc[0].current_price),
      },
    ])
    .addFields([
      {
        name: eth[0].name,
        value: Intl.NumberFormat().format(eth[0].current_price),
      },
    ])
    .addFields([
      {
        name: bnb[0].name,
        value: Intl.NumberFormat().format(bnb[0].current_price),
      },
    ])
    .addFields([
      {
        name: sol[0].name,
        value: Intl.NumberFormat().format(sol[0].current_price),
      },
    ])
    .addFields([
      {
        name: xmr[0].name,
        value: Intl.NumberFormat().format(xmr[0].current_price),
      },
    ])
    .setImage(
      "https://www.bitcoin.com.mx/content/images/2020/05/Criptomonedas_pago_empleo.png"
    )
    .setTimestamp(Date.now());

  await interaction.reply({
    embeds: [embed],
  });
}

module.exports.list = list;
