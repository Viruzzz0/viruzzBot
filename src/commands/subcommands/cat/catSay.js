const axios = require("axios");
const PREFIX_CAT_URL = `https://cataas.com`

function catSay (interaction) {
  const text = interaction.options.getString('text'); 
  const resolutionText = interaction.options.getInteger('resolution'); 
  const resolution = resolutionText ? resolutionText :'200'
  const url = `${PREFIX_CAT_URL}/cat/says/${text}?width=${resolution}&height=${resolution}&json=true`

  axios(url)
    .then(res => res.data)
    .then(data => `${PREFIX_CAT_URL}${data.url}`)
    .then(data => {
      interaction.reply({
          content: `${data}`,
        });
    })
 };

module.exports.catSay = catSay;
