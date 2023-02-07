const axios = require('axios')
const { SlashCommandBuilder } = require('@discordjs/builders')
const { choices } = require('../../data/choicesLanguage')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('translate')
    .setDescription('convert time to a different time zone')
    .addStringOption((option) =>
      option
        .setName('from')
        .setDescription('idioma 1')
        .setRequired(true)
        .addChoices(
          choices.es,
          choices.en,
          choices.pt,
          choices.fr,
          choices.jp,
          choices.ko,
          choices.de,
          choices.ar,
          choices.detect
        )
    )
    .addStringOption((option) =>
      option
        .setName('to')
        .setDescription('idioma 2')
        .setRequired(true)
        .addChoices(
          choices.es,
          choices.en,
          choices.pt,
          choices.fr,
          choices.jp,
          choices.ko,
          choices.de,
          choices.ar
        )
    )
    .addStringOption((option) =>
      option.setName('text').setDescription('Enter a number').setRequired(true)
    ),

  async run (client, interaction) {
    const from = interaction.options.getString('from')
    const to = interaction.options.getString('to')
    const text = interaction.options.getString('text')

    const encodedParams = new URLSearchParams()
    encodedParams.append('q', text)
    encodedParams.append('target', to)
    from === 'null'
      ? console.log('select detect')
      : encodedParams.append('source', from)

    const options = {
      method: 'POST',
      url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Key': '53351dee31msh305061050cf7042p17eaedjsnc91dc9d740c5',
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
      },
      data: encodedParams
    }

    async function another () {
      try {
        const response = await axios(options)
        const res = response.data.data.translations[0].translatedText
        // message.channel.send({ content: res });
        await interaction.reply({ content: res })
      } catch (err) {
        console.log(err)
      }
    }
    another()

    // const embed = new EmbedBuilder()
    //   .setTitle(`Avatar de ${mention.tag}`)
    //   .setImage(mention.displayAvatarURL({ size: 1024, dynamic: true }))
    //   .setTimestamp();

    // await interaction.reply({ embeds: [embed] });
  }
}
