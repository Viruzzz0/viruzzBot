const { SlashCommandBuilder } = require("@discordjs/builders");
const figlet = require("figlet");

const standard = { name: "Standard", value: "Standard" };
const subZero = { name: "Sub-Zero", value: "Sub-Zero" };
const bigMoneyNe = { name: "Big Money-ne", value: "Big Money-ne" };
// const hora = { name: "Hour", value: "hours" };

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ascii")
    .setDescription("returns the text with ASCII characters")
    .addStringOption((option) =>
      option
        .setName("font")
        .setDescription("lettering font")
        .setRequired(true)
        .addChoices(standard, subZero, bigMoneyNe)
    )
    .addStringOption((option) =>
      option.setName("text").setDescription("insert text").setRequired(true)
    ),

  async run(client, interaction) {
    const texto = interaction.options.getString("text");
    const font = interaction.options.getString("font");
    // await interaction.deferReply();

    function ascii(params) {
      return figlet.textSync(params, {
        font: font,
        whitespaceBreak: true,
      });
    }
    // const mensaje = args.join(" ");
    let arr = texto.split(' '); 
    let msg = "";
    arr.forEach((item) => {
      msg = msg + `${item}\n`;
    });

    await interaction.reply({
      content: "```" + ascii(msg) + "```",
    });
  },
};
