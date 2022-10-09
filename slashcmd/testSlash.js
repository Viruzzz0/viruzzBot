const { SlashCommandBuilder } = require("@discordjs/builders");
const api_key = '88f0972f68c35f2917b60c2ccade9d818e191f321b875a2e0c9c9061d180c60bba75f1ea02f654125873dacdb50a4bc6a59a2c66e49f16a76019b87d913a6c1d'
const axios = require('axios');

const api = axios.create({
  baseURL: 'https://v1.api.amethyste.moe',
  headers: {Authorization: api_key}
});

// async function saveFavorite(imageId) {
//   const result = await api.get('/image')
// }

// saveFavorite()


module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("#############"),

  async run(client, interaction) {
    interaction.reply({
      content: `Pong! **${client.ws.ping}**`,
    });
  },
};
