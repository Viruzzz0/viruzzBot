const { ButtonBuilder, ButtonStyle, ActionRowBuilder} = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  name: "mybot",
  alias: ["mb"],

  async execute(client, message, args) {
    const button = new ButtonBuilder()
      .setLabel("Link")
      .setStyle(ButtonStyle.Link)
      .setURL(
        "https://discord.com/developers/applications/834249101414760448/information"
      );

    const rowlink = new ActionRowBuilder().addComponents(button);

    const m = await message.channel.send({
      content: "aqui esta mi coso",
      components: [rowlink],
    });

    // message.channel.send({ content: `https://discord.com/developers/applications/834249101414760448/information` });
  },
};
