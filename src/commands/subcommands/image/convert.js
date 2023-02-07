
async function convert (interaction) {
  const convert = interaction.options.getString('convert')

  await interaction.reply({
    content: convert

  })
};

module.exports.convert = convert
