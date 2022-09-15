const Discord = require("discord.js");
const API ="https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc";

const axios = require("axios");

module.exports = {
  name: "bitcoin",
  alias: ["b"],

  execute(client, message, args) {
    const anotherFunction = async (url_api) => {
      try {
        const result = await axios({
          method: "get",
          url: API,
          params: {
            per_page: 1,
            page: 1,
          },
        });
        //   .then(response => console.log(response.data))
        const bitcoin = result.data;
        message.channel.send(`${bitcoin[0].current_price}`);
      } catch (error) {
        console.error(error);
      }
    };
    anotherFunction(API);
  },
};
