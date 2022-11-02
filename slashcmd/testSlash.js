const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

const mili = { name: "Milisegundo", value: "millisecond" };
const seg = { name: "Segundo", value: "second" };
const min = { name: "Minutos", value: "minutes" };
const hora = { name: "Horas", value: "hours" };

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("#############")
    .addStringOption((option) =>
      option
        .setName("time")
        .setDescription("Elige el formato de tu numero")
        .setRequired(true)
        .addChoices(mili, seg, min, hora)
    )
    .addNumberOption((option) =>
      option
        .setName("numero")
        .setDescription("Ingrese un numero")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("to")
        .setDescription("Elige a que formato quiere convertirlo")
        .setRequired(true)
        .addChoices(mili, seg, min, hora)
    ),

  async run(client, interaction) {
    const time = interaction.options.getString("time");
    const num = interaction.options.getNumber("numero");
    const toTime = interaction.options.getString("to");
    let numReturn;

    const milgToSec = (tim) => tim / 1000;
    const milgToMin = (tim) => tim / 60000;
    const milgToHr = (tim) => tim / 3600000;
    const milgToDay = (tim) => tim / 86400000;

    const secToMilg = (tim) => tim * 1000;
    const secToMin = (tim) => tim / 60;
    const secToHr = (tim) => tim / 3600;
    const secToDay = (tim) => tim / 86400;

    const minToMilg = (tim) => tim * 60000;
    const minToSec = (tim) => tim * 60;
    const minToHr = (tim) => tim / 60;
    const minToDay = (tim) => tim / 1440;

    const hrToMilg = (tim) => tim * 3600000;
    const hrToSec = (tim) => tim * 3600;
    const hrToMin = (tim) => tim * 60;
    const hrToDay = (tim) => tim / 24;

    const dayToMilg = (tim) => tim * 86400000;
    const dayToSec = (tim) => tim * 86400;
    const dayToMin = (tim) => tim * 1440;
    const dayToHr = (tim) => tim * 24;

    console.log(time);
    console.log(toTime);

    if (time == "millisecond") {
      if (toTime == "second") numReturn = milgToSec(num);
      else if (toTime == "minutes") numReturn = milgToMin(num);
      else if (toTime == "hours") numReturn = milgToHr(num);
      else numReturn = num
    }
    else if (time == "second") {
      if (toTime == "millisecond") numReturn = secToMilg(num);
      else if (toTime == "minutes") numReturn = secToMin(num);
      else if (toTime == "hours") numReturn = secToHr(num);
      else numReturn = num
    }
    else if (time == "minutes") {
      if (toTime == "millisecond") numReturn = minToMilg(num);
      else if (toTime == "second") numReturn = minToSec(num);
      else if (toTime == "hours") numReturn = minToHr(num);
      else numReturn = num
    }
    else if (time == "hours") {
      if (toTime == "millisecond") numReturn = hrToMilg(num);
      else if (toTime == "second") numReturn = hrToSec(num);
      else if (toTime == "minutes") numReturn = hrToMin(num);
      else numReturn = num
    }

    console.log(numReturn);

    const embed = new EmbedBuilder()
      .setTitle(`Convert`)
      .setColor("blue")
      .setFields([
        { name: `${time}`, value: `${num}`, inline: true },
        { name: `${toTime}`, value: `${numReturn}`, inline: true }
      ])
      // .setFields([
      //   { name: `${time}`, value: `${num}`},
      //   { name: `${toTime}`, value: `${numReturn}`}
      // ])
      // .setFooter({
      //   text: "valor dividido entre 60",
      // });
      
    await interaction.reply({
      embeds: [embed],
    });
  },
};
