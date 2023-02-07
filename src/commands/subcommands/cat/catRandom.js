const { EmbedBuilder } = require('discord.js')
const axios = require('axios')
const API = 'https://api.thecatapi.com/v1/images/search'

async function catRandom (interaction) {
  try {
    const result = await axios(API)
    const dataCat = result.data

    const embed = new EmbedBuilder()
      .setTitle('gato lol')
      .setColor('Random')
      .setImage(`${dataCat[0].url}`)
      .setTimestamp()

    await interaction.reply({
      embeds: [embed]
    })
  } catch (err) {
    console.log(err)
  }
};

module.exports.catRandom = catRandom
