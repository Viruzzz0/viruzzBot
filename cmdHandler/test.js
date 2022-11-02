const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "test",
  alias: ["t"],

  async execute(client, message, args) {
    const embed = new EmbedBuilder()
      .setTitle(`Convert`)
      .setColor("blue")
      .setFields([
        { name: "minutos   =", value: "5000", inline: true },
        { name: "segundo", value: "5", inline: true }
      ])
      // .setFooter({
      //   text: "Usar el prefix -",
      // })
      // .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};
