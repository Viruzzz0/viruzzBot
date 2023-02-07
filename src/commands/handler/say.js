module.exports = {
  name: 'say',
  alias: [],

  async execute (client, message, args) {
    const mensaje = args.join(' ')
    if (!mensaje) return message.channel.send('Escribe algo')

    // setTimeout(function () {
    await message.delete()
      .then(() => {
        message.channel.send(`${mensaje}`)
      })

    // console.log(message.channel);
    // }, 700);
  }
}
