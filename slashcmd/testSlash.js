const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
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
    .setName("test")
    .setDescription("#############")
    .addStringOption((option) =>
      option
        .setName("country")
        .setDescription("Choose the format of your number")
        .setRequired(true)
        .addChoices(es, ar, ch, mx, jp, eeuu, eeuuAn, cos)
    )
    .addStringOption((option) =>
      option.setName("time").setDescription("Enter a number").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("to")
        .setDescription("Choose the format you want to convert it to")
        .setRequired(true)
        .addChoices(es, ar, ch, mx, jp, eeuu, eeuuAn, cos)
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
        console.log(res.data);
        const convertPretty = (str) => {
          const dataArray = str.split(" ");
          const date = dataArray[0].slice(5);
          const time = dataArray[1].slice(0, 5);
          return `${date} ${time}`;
        };
        const selectedTime = res.data.base_location.datetime;
        const convertedTime = res.data.target_location.datetime;
        const timezoneLocation = res.data.base_location.requested_location;
        const toTimezoneLocation = res.data.target_location.requested_location;

        function dateDiffer(time, time2) {
          const date1 = new Date(time);
          const date2 = new Date(time2);
          const day = date1.getDay();
          const day2 = date2.getDay();
          const milgToHr = (tim) => tim / 3600000;

          const converToMili = (date) => {
            const hours = date.getHours();
            const min = date.getMinutes();
            const hrToMilg = (tim) => tim * 3600000;
            const minToMilg = (tim) => tim * 60000;
            const totalMili = hrToMilg(hours) + minToMilg(min);
            return totalMili;
          };

          if (day != day2) {
            console.log("es distindo");
            const removeZero = (num) => (num < 0 ? num * -1 : num);
            const differ = converToMili(date1) - converToMili(date2);
            const differInHr = milgToHr(differ);
            const result = removeZero(differInHr) - 24;
            return removeZero(result);
          }

          const differ = converToMili(date1) - converToMili(date2);
          const result = milgToHr(differ);
          return result;
        }

        const embed = new EmbedBuilder()
          .setTitle(`**Zone time**`)
          .setColor("blue")
          .setFields([
            {
              name: `🌍 **${timezoneLocation}**`,
              value: `⏲ **${convertPretty(selectedTime)}**\nㅤ`,
            },
            {
              name: `🌍 **${toTimezoneLocation}**`,
              value: `⏲ **${convertPretty(convertedTime)}**`,
            },
          ])
          .setFooter({
            text: `time difference: ${dateDiffer(selectedTime, convertedTime)}`,
          });

        // Enviar mensaje
        await interaction.channel.send({
          embeds: [embed],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
