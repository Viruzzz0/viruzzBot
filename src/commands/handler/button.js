const { ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  name: "button",
  alias: ["bb"],

  async execute(client, message, args) {
    // Se crea un boton
    const button = new ButtonBuilder()
      .setCustomId("b1")
      .setLabel("button")
      .setStyle(ButtonStyle.Primary);

    // Se pasa el button creado como components a row
    const row = new ActionRowBuilder().addComponents(button);

    // Envia el mensaje con el component ActionRow
    const m = await message.channel.send({
      content: "Precious",
      components: [row],
    });

    // El ifilter le agrega un filtro al el button, en este caso solo funciona para el autor del mensaje
    // Retorna un InteractionCollector
    const ifilter = (i) => i.user.id === message.author.id;
    const collector = m.createMessageComponentCollector({
      filter: ifilter,
      time: 60000,
    });

    collector.on("collect", async (i) => {
      // console.log(i);
      if (i.customId === "b1") {
        await i.deferUpdate();
        // .then(console.log)
        // .catch(console.error);

        // Edita el mensaje del button (i igual a ButtonInteraction)
        i.editReply({ content: "🖕", components: [] });
      }
    });

    // Finaliza en timepo de recopilacion (osea cuando el time del collector termine)
    collector.on("end", (collected) =>
      console.log(`Collected ${collected.size} items`)
    );
  },
};
