const axios = require("axios");

class SearchImage {
  constructor({
    textImg,
    count = 5 
    }) {
    this.textImg = textImg;
    this.count = count;
  }

  quantity(num) {
    this.count = num;
  }

  async petition() {
    const options = {
      method: "GET",
      url: "https://bing-image-search1.p.rapidapi.com/images/search",
      params: { q: this.textImg, count: this.count },
      headers: {
        "X-RapidAPI-Key": "53351dee31msh305061050cf7042p17eaedjsnc91dc9d740c5",
        "X-RapidAPI-Host": "bing-image-search1.p.rapidapi.com",
      },
    };

    const response = await axios(options);
    const searchText = response.data.queryContext.originalQuery;
    const imgArray = [];
    for (let i = 0; i < this.count; i++) {
      imgArray.push(response.data.value[i].contentUrl);
    }
    return {
      images: imgArray,
      nameImg: searchText,
    };
  }
}

module.exports.SearchImage = SearchImage;