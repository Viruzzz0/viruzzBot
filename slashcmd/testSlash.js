const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("#############")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("Inserte el texto")
        .setRequired(true)
    ),

  async run(client, interaction) {
    const texto = interaction.options.getString("text");
    await interaction.deferReply();

    const encodedParams = new URLSearchParams();
    encodedParams.append("q", texto);
    encodedParams.append("target", "en");
    encodedParams.append("source", "es");

    const options = {
      method: "POST",
      url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "application/gzip",
        "X-RapidAPI-Key": "53351dee31msh305061050cf7042p17eaedjsnc91dc9d740c5",
        "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
      },
      data: encodedParams,
    };

    const response = await axios(options);
    const res = response.data.data.translations[0].translatedText;
    await interaction.editReply({
      content: `${res}`,
    });
  },
};
