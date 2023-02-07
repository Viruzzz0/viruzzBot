const { AttachmentBuilder, EmbedBuilder } = require('discord.js')
const sharp = require('sharp')
const axios = require('axios')
// const { Buffer } = require('node:buffer')

async function resize (interaction) {
  const attachmentUser = interaction.options.getAttachment('image')
  const resolution = interaction.options.getInteger('resolution')
  let url = interaction.options.getString('url')
  let name

  console.log(url)
  if (attachmentUser) {
    url = attachmentUser.attachment
  } else {
    name = url.split('/').pop().split('.')[0]
  }

  const buffer = await axios.get(url, { responseType: 'arraybuffer' })
  // const buffer = Buffer.from(response.data, 'utf-8')

  // { animated: true  }
  const { data, info } = await sharp(buffer, { animated: true })
    .resize(resolution)
    .toBuffer({ resolveWithObject: true })
    .catch(err => {
      console.log(err)
    })

  const attachment = new AttachmentBuilder()
    .setFile(data)
    .setName(`${name}.${info.format}`)
    .setDescription('description lol')

  const embed = new EmbedBuilder()
    .setTitle('Resize')
    .addFields({ name: 'width', value: `${info.width}`, inline: true })
    .addFields({ name: 'height', value: `${info.height}`, inline: true })
    .setColor('blue')
    .setImage(`attachment://${name}.${info.format}`)
    .setFooter({
      text: `format: ${info.format}`
    })

  await interaction.reply({
    content: 'Resizing...',
    embeds: [embed],
    files: [attachment]

  })
};

module.exports.resize = resize
