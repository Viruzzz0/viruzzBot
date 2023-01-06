const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const { timePretty } = require("../../tools/timePretty");
const { dateDiffer } = require("../../tools/dateDiffer");
const axios = require("axios");

const es = {
  name: "España, Madrid GMT+1",
  value: "España, Madrid",
};
const ar = {
  name: "Argentina, Buenos Aires GMT-3",
  value: "Argentina, Buenos Aires",
};
const ch = {
  name: "Chile, Santiago GMT-3",
  value: "Chile, Santiago",
};
const mx = {
  name: "Mexico, Ciudad de México GMT-6",
  value: "Mexico, Ciudad de México",
};
const eeuu = {
  name: "United States, New York GMT-5",
  value: "United States, New York",
};
const eeuuAn = {
  name: "United States, Los Angeles GMT-8",
  value: "United States, Los Angeles",
};
const jp = {
  name: "Japon, Tokyo GMT+9",
  value: "Japon, Tokyo",
};
const cos = {
  name: "South Korea, Seoul GMT+9",
  value: "South Korea, Seoul",
};

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
            .addChoices(es, ar, ch, mx, jp, eeuu, eeuuAn, cos)
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
            .addChoices(es, ar, ch, mx, jp, eeuu, eeuuAn, cos)
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
    const monthDayZero = [month, day].map(addZero);
    const timeWatch = time.split(":").map(addZero);
    const data = `${year}-${monthDayZero[0]}-${monthDayZero[1]} ${timeWatch[0]}:${timeWatch[1]}:00`;

    const convert = `https://timezone.abstractapi.com/v1/convert_time?api_key=ada46d41f7de474bb43005f0bc601131&base_location=${country}&base_datetime=${data}&target_location=${to}`;

    await axios
      .get(convert)
      .then(async (res) => {
        const {data} = res;
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
            text: `time difference: ${dateDiffer(selecTime.datetime, converTime.datetime)}`,
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
