const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const axios = require("axios");
const API = "https://api.thecatapi.com/v1/images/search";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cat")
    .setDescription("Devuelve una imagen random de un gato :D"),

  async run(client, interaction) {
    const catRandom = async (urlApi) => {
      try {
        const result = await axios(urlApi);
        const dataCat = result.data;

        const embed = new EmbedBuilder()
          .setTitle("gato lol")
          .setColor("Random")
          .setImage(`${dataCat[0].url}`)
          .setTimestamp();

        await interaction.reply({
          embeds: [embed],
        });
      } catch (err) {
        console.log(err);
      }
    };
    catRandom(API);
  },
};
