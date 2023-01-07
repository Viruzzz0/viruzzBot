const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const { timePretty } = require("../../tools/timePretty");
const { dateDiffer } = require("../../tools/dateDiffer");
const { choices } = require("../../data/choicesTimeZone");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("zone")
    .setDescription("convert time to a different time zone")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("time")
        .setDescription("convert time to a different time zone")
        .addStringOption((option) =>
          option
            .setName("country")
            .setDescription("Choose a time zone")
            .setRequired(true)
            .addChoices(
              choices.es,
              choices.ar,
              choices.ch,
              choices.mx,
              choices.jp,
              choices.eeuu,
              choices.eeuuAn,
              choices.cos
            )
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
            .setDescription("Choose the zone you want to convert to")
            .setRequired(true)
            .addChoices(
              choices.es,
              choices.ar,
              choices.ch,
              choices.mx,
              choices.jp,
              choices.eeuu,
              choices.eeuuAn,
              choices.cos
            )
        )
    ),

  async run(client, interaction) {
    const country = interaction.options.getString("country");
    const time = interaction.options.getString("time");
    const to = interaction.options.getString("to");

    const date = new Date();
    const [month, day, year] = [
      date.getMonth() + 1,
      date.getDate(),
      date.getFullYear(),
    ];

    // formast 2022-12-01 07:00:00
    const addZero = (item) => {
      const elem = `${item}`.split("");
      if (elem.length === 1) {
        elem.unshift(0);
        return elem.join("");
      }
      return item;
    };

    const [monthDayZero, timeWatch] = [
      [month, day].map(addZero),
      time.split(":").map(addZero),
    ];
    const data = `${year}-${monthDayZero[0]}-${monthDayZero[1]} ${timeWatch[0]}:${timeWatch[1]}:00`;

    const convert = `https://timezone.abstractapi.com/v1/convert_time?api_key=ada46d41f7de474bb43005f0bc601131&base_location=${country}&base_datetime=${data}&target_location=${to}`;

    await axios
      .get(convert)
      .then(async (res) => {
        const { data } = res;
        const selecTime = data.base_location;
        const converTime = data.target_location;

        const embed = new EmbedBuilder()
          .setTitle(`**Zone time**`)
          .setColor("blue")
          .setFields([
            {
              name: `🌍 **${selecTime.requested_location}**`,
              value: `⏲ **${timePretty(selecTime.datetime)}**\nㅤ`,
            },
            {
              name: `🌍 **${converTime.requested_location}**`,
              value: `⏲ **${timePretty(converTime.datetime)}**`,
            },
          ])
          .setFooter({
            text: `time difference: ${dateDiffer(
              selecTime.datetime,
              converTime.datetime
            )}`,
          });

        // Enviar mensaje
        await interaction.reply({
          embeds: [embed],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
