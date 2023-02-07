const { EmbedBuilder } = require('discord.js')
const axios = require('axios')
const API = 'https://api.coingecko.com/api/v3/simple/price'

async function search (interaction) {
  const msg = interaction.options.getString('text')
  const options = {
    method: 'get',
    url: API,
    params: {
      ids: msg,
      precision: 2,
      vs_currencies: 'usd',
      include_24hr_change: true
    }
  }

  const data = await axios
    .request(options)
    .then((response) => response.data)
    .catch((error) => {
      console.error(error)
    })

  if (data) return

  const getName = (obj) => {
    for (const str in obj) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  }
  const cripto = Object.values(data)[0]
  const style = cripto.usd_24h_change > 0 ? 'Green' : 'Red'
  const name = getName(data)
  const usd = `usd:  ${Intl.NumberFormat().format(cripto.usd)}`
  const hr24 = `24hr: ${
    cripto.usd_24h_change > 0 ? '▲' : '▼'
  } ${cripto.usd_24h_change.toFixed(1)}%`

  // ▲  ▼
  const embed = new EmbedBuilder()
    .setTitle(`${name}`)
    .setDescription(`${usd}\n${hr24}`)
    .setColor(style)

  await interaction.reply({
    embeds: [embed]
  })
}

module.exports.search = search
