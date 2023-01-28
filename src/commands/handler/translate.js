const axios = require("axios");

module.exports = {
  name: "tla",
  alias: [],

  execute(client, message, args) {
    const mensaje = args.join(" ");
    if (!mensaje) return message.channel.send("Escribe algo");

    let textEs = mensaje;
    console.log(textEs);

    const encodedParams = new URLSearchParams();
    encodedParams.append("q", textEs);
    encodedParams.append("target", "en");
    // encodedParams.append("source", "es");

    const options = {
      method: "POST",
      url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "application/gzip",
        "X-RapidAPI-Key": "53351dee31msh305061050cf7042p17eaedjsnc91dc9d740c5",
        "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
      },
      data: encodedParams,
    };

    async function another() {
      try {
        const response = await axios(options);

        const res = response.data.data.translations[0].translatedText;
        message.channel.send({ content: res });
      } catch (err) {
        console.log(err);
      }
    }
    another();
  },
};
