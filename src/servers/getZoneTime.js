const axios = require("axios");

async function getZoneTime(url) {
  return await axios
    .get(url)
    .then(async (res) => {
      const { data } = res;
      const selecTime = data.base_location;
      const converTime = data.target_location;
      return [selecTime, converTime];
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports.getTime = getZoneTime;
