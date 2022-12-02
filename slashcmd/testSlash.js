const { SlashCommandBuilder } = require("@discordjs/builders");
const embedMesagge = require("../embeds/embed-basic");

const es = { name: "España GMT+1", value: "GMT+1" };
const ar = { name: "Argentina GMT-3", value: "GMT-3" };
const ch = { name: "Chile GMT-3", value: "GMT-3" };
const mx = { name: "Mexico GMT-6", value: "GMT-6" };

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("#############")
    .addStringOption((option) =>
      option
        .setName("country")
        .setDescription("Choose the format of your number")
        .setRequired(true)
        .addChoices(es, ar, ch, mx)
    )
    .addStringOption((option) =>
      option
        .setName("time")
        .setDescription("Enter a number")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("to")
        .setDescription("Choose the format you want to convert it to")
        .setRequired(true)
        .addChoices(es, ar, ch, mx)
    ),

  async run(client, interaction) {
    if (interaction.user.id === "867251021984956448") {
      const msg = interaction.options.getString("value");
      const mention = interaction.options.getMentionable("value2");

      await interaction.channel.send({
        content: "Precious",
      });

      // await interaction.reply({
      //   embeds: [embedMesagge.embed],
      // });
    }
  },
};
