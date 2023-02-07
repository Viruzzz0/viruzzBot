const SearchImage = require('../../servers/bingImg').SearchImage
const ToggleEmbed = require('../../tools/toggleEmbed').ToggleEmbed
const {
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle
} = require('discord.js')

module.exports = {
  name: 'img',
  alias: [],

  async execute (client, message, args) {
    const msg = args.join(' ')
    if (!msg) return message.channel.send('Escribe algo')

    const getImageObj = new SearchImage({ textImg: msg, count: 5 })
    const getImage = await getImageObj.petition()

    const embed = new EmbedBuilder()
      .setTitle(getImage.nameImg)
      .setColor('Random')
      .setImage(getImage.images[0])
      .setFooter({
        text: 'Image 0'
      })
      .setTimestamp()

    const buttonGo = new ButtonBuilder()
      .setCustomId('next')
      .setLabel('->')
      .setStyle(ButtonStyle.Primary)

    const buttonReturn = new ButtonBuilder()
      .setCustomId('preview')
      .setLabel('<-')
      .setStyle(ButtonStyle.Primary)

    // Se pasa el button creado como components a row
    const row = new ActionRowBuilder().addComponents(buttonReturn, buttonGo)

    // Envia el mensaje con el component ActionRow
    const m = await message.channel.send({
      content: `image message ${msg}`,
      components: [row],
      embeds: [embed]
    })

    // El ifilter le agrega un filtro al el button, en este caso solo funciona para el autor del mensaje
    // Retorna un InteractionCollector
    const ifilter = (i) => i.user.id === message.author.id
    const collector = m.createMessageComponentCollector({
      filter: ifilter,
      time: 120000
    })

    const count = 0
    const toggleImage = new ToggleEmbed({
      embed,
      actionRow: row,
      images: getImage.images
    })
    const toggle = await toggleImage.action(count)

    collector.on('collect', async (collect) => {
      toggleImage.collector = collect
      await toggle.on()
    })
    // TODO fix this
    collector.on('end', (collected) =>
      console.log(`Collected ${collected.size} items`)
    )
  }
}
