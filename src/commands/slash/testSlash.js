const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("search method")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("Phrase to search for")
        .setAutocomplete(true)
    )
    .addStringOption((option) =>
      option
        .setName("version")
        .setDescription("Phrase to search for")
        .setAutocomplete(true)
    ),

  async autocomplete(interaction) {
    const focusedOption = interaction.options.getFocused(true);
    const insertText = (strin, txt) => strin.slice(0, 0) + txt + strin.slice(0);
    let choices;

    const options = {
      method: "GET",
      url: "https://spotify23.p.rapidapi.com/search/",
      params: {
        q: focusedOption.value,
        type: "tracks",
        offset: "0",
        limit: "10",
        numberOfTopResults: "5",
      },
      headers: {
        "X-RapidAPI-Key": "36590803f9msha11501751d36d00p1fea43jsn9868f6861b7d",
        "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
      },
    };

    await axios
      .request(options)
      .then((response) => {
        choices = response.data.tracks.items.map((track) => ({
          name: track.data.name,
          artists: track.data.artists.items[0].profile.name,
          id: track.data.id,
        }));
      })
      .catch((error) => {
        console.error(error);
      });

    // console.log(choices);

    

    const filtered = choices
      .map((choice) => `${choice.name} ${choice.artists}`)
      .filter((choice) => choice.toLowerCase().startsWith(focusedOption.value.toLowerCase()))
      .map((choice) => insertText(choice.split(" ").join(" - "), "🎵 "));

    await interaction.respond(
      filtered.map((choice) => ({ name: choice, value: "lol" }))
    );
  },

  async run(client, interaction) {
    const selec = interaction.options.getString("query");
    // const selecValue = interaction.options.getFocused(true);
    console.log(selec);
    await interaction.reply({
      content: `search lyrics ${selec}`,
    });
  },
};
