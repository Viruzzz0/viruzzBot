const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const axios = require("axios");
const API = "https://api.ebird.org/v2/data/obs/AR-C/recent?maxResults=3";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bird")
    .setDescription("Detalle sobre un ave"),

  async run(client, interaction) {
    const catRandom = async (urlApi) => {
      try {
        const result = await axios({
          url: urlApi,
          method: 'get',
          headers: {'X-eBirdApiToken': 'mgut48c6liep'}
        });
        const dataBird = result.data;
        console.log(dataBird[0].comName);
        const img = 'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/244985541/1800';

        const embed = new EmbedBuilder()
          .setTitle(`${dataBird[0].comName}`)
          .setColor("Random")
          .setImage(`${img}`)
          .setTimestamp();

        await interaction.reply({
          embeds: [embed],
          // content: `test bird`,
        });
      } catch (err) {
        console.log(err);
      }
    };
    catRandom(API);
  },
};
