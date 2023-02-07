async function lyrics (interaction) {
  const msg = interaction.options.getString('text')
  await interaction.reply({
    content: `search ${msg} lyrics `
  })
}

module.exports.lyrics = lyrics
