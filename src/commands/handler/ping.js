module.exports = {
  name: "ping",
  alias: [],

  execute(client, message, args) {
    message.channel.send({ content: `Pong! **${client.ws.ping}**` });
  },
};
