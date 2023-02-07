const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: 'comands',
  alias: ['cmd'],

  execute (client, message, args) {
    const embed = new EmbedBuilder()
      .setTitle('Lista de Comandos Handler')
      .setColor('blue')
      .addFields([
        {
          name: '`avatar`\n`bitcoin`\n`button`\n`count`\n`cripto`\n`lol`\n`mybot`\n`ping`\n`say`',
          value: '\u200B'
        }
      ])
      .setFooter({
        text: 'Usar el prefix -'
      })
      .setTimestamp()

    message.channel.send({ embeds: [embed] })
  }
}
