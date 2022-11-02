const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

const mili = { name: "Millisecond", value: "millisecond" };
const seg = { name: "Second", value: "second" };
const min = { name: "Minute", value: "minutes" };
const hora = { name: "Hour", value: "hours" };

module.exports = {
  data: new SlashCommandBuilder()
    .setName("convert")
    .setDescription("Converts the time format to another format")
    .addStringOption((option) =>
      option
        .setName("time")
        .setDescription("Choose the format of your number")
        .setRequired(true)
        .addChoices(mili, seg, min, hora)
    )
    .addNumberOption((option) =>
      option
        .setName("number")
        .setDescription("Enter a number")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("to")
        .setDescription("Choose the format you want to convert it to")
        .setRequired(true)
        .addChoices(mili, seg, min, hora)
    ),

  async run(client, interaction) {
    const time = interaction.options.getString("time");
    const num = interaction.options.getNumber("number");
    const toTime = interaction.options.getString("to");
    let numReturn;
    let formulaText;

    const milgToSec = (tim) => tim / 1000;
    const milgToMin = (tim) => tim / 60000;
    const milgToHr = (tim) => tim / 3600000;
    // const milgToDay = (tim) => tim / 86400000;

    const secToMilg = (tim) => tim * 1000;
    const secToMin = (tim) => tim / 60;
    const secToHr = (tim) => tim / 3600;
    // const secToDay = (tim) => tim / 86400;

    const minToMilg = (tim) => tim * 60000;
    const minToSec = (tim) => tim * 60;
    const minToHr = (tim) => tim / 60;
    // const minToDay = (tim) => tim / 1440;

    const hrToMilg = (tim) => tim * 3600000;
    const hrToSec = (tim) => tim * 3600;
    const hrToMin = (tim) => tim * 60;
    // const hrToDay = (tim) => tim / 24;

    // const dayToMilg = (tim) => tim * 86400000;
    // const dayToSec = (tim) => tim * 86400;
    // const dayToMin = (tim) => tim * 1440;
    // const dayToHr = (tim) => tim * 24;

    if (time == "millisecond") {
      if (toTime == "second") {
        formulaText = "Value divided by 1000";
        numReturn = milgToSec(num);
      } else if (toTime == "minutes") {
        formulaText = "Value divided by 60000";
        numReturn = milgToMin(num);
      } else if (toTime == "hours") {
        formulaText = "Value divided by 3600000";
        numReturn = milgToHr(num);
      } else numReturn = num;
    } else if (time == "second") {
      if (toTime == "millisecond") {
        formulaText = "Value multiplied by 1000";
        numReturn = secToMilg(num);
      } else if (toTime == "minutes") {
        formulaText = "Value divided by 60";
        numReturn = secToMin(num);
      } else if (toTime == "hours") {
        formulaText = "Value divided by 3600";
        numReturn = secToHr(num);
      } else numReturn = num;
    } else if (time == "minutes") {
      if (toTime == "millisecond") {
        formulaText = "Value multiplied by 60000";
        numReturn = minToMilg(num);
      } else if (toTime == "second") {
        formulaText = "Value multiplied by 60";
        numReturn = minToSec(num);
      } else if (toTime == "hours") {
        formulaText = "Value divided by 60";
        numReturn = minToHr(num);
      } else numReturn = num;
    } else if (time == "hours") {
      if (toTime == "millisecond") {
        formulaText = "Value multiplied by 3600000";
        numReturn = hrToMilg(num);
      } else if (toTime == "second") {
        formulaText = "Value multiplied by 3600";
        numReturn = hrToSec(num);
      } else if (toTime == "minutes") {
        formulaText = "Value multiplied by 60";
        numReturn = hrToMin(num);
      } else numReturn = num;
    }

    console.log(numReturn);

    const embed = new EmbedBuilder()
      .setTitle(`Convert`)
      .setColor("blue")
      .setFields([
        { name: `${time}`, value: `${num}`, inline: true },
        { name: `${toTime}`, value: `${numReturn}`, inline: true },
      ])
      .setFooter({
        text: `${formulaText}`,
      });

    await interaction.reply({
      embeds: [embed],
    });
  },
};
