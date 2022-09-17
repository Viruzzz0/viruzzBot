module.exports = {
  name: "say",
  alias: [],

  execute(client, message, args) {
    const mensaje = args.join(" ");
    if (!mensaje) return message.channel.send("Escribe algo");

    setTimeout(function () {
      message.delete();
      message.channel.send(`${mensaje}`);
      // console.log(message.channel);
    }, 700);
  },
};
