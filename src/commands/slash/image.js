const { SlashCommandBuilder } = require('@discordjs/builders')
const { resize } = require('../subcommands/image/resize')
const { convert } = require('../subcommands/image/convert')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('image')
    .setDescription('El bot responderá con su ping en ms.')
    .addSubcommand((subcommand) =>
      subcommand
        .setName('resize')
        .setDescription('search for an image')
        .addIntegerOption((option) =>
          option
            .setName('resolution')
            .setDescription('Enter a text')
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName('url')
            .setDescription('name of the song')
        )
        .addAttachmentOption((option) =>
          option
            .setName('image')
            .setDescription('The image to dither')
        ))
    .addSubcommand((subcommand) =>
      subcommand
        .setName('convert')
        .setDescription('find the lyrics of a song')
        .addStringOption((option) =>
          option
            .setName('format')
            .setDescription('name of the song')
            .setRequired(true)
        )
    ),

  async run (client, interaction) {
    if (interaction.options._subcommand === 'resize') resize(interaction)
    else if (interaction.options._subcommand === 'convert') convert(interaction)
  }
}

// ! Expande la imagen manteniendo en ebjeto (png) su tamaño

//  const res = await sharp('E:/ViruzX/viruzzBot/image/die.png')
//       // .resize(140)
//       .extend({
//         top: 100,
//         bottom: 100,
//         left: 100,
//         right: 100,
//         background: { r: 0, g: 0, b: 0, alpha: 0 }
//       })
//       .toBuffer()

// .toBuffer((err, data, info) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(info)
//   }
// })

//  .resize({ width: 128, height: 128 })
// .toFormat('png')
