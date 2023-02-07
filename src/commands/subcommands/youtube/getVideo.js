const axios = require('axios')
const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js')

async function getVideo (interaction) {
  const id = interaction.options.getString('url')
  const options = {
    method: 'GET',
    url: 'https://youtube-media-downloader.p.rapidapi.com/v2/video/details',
    params: { videoId: id },
    headers: {
      'X-RapidAPI-Key': '36590803f9msha11501751d36d00p1fea43jsn9868f6861b7d',
      'X-RapidAPI-Host': 'youtube-media-downloader.p.rapidapi.com'
    }
  }

  const videos = await axios
    .request(options)
    .then((response) => response.data.videos.items)
    .catch(function (error) {
      console.error(error)
    })

  const video1080p = videos.find(
    (item) =>
      (item.hasAudio === true && item.quality === '1080p60') ||
      item.quality === '1080p'
  )
  const video720p = videos.find(
    (item) =>
      (item.hasAudio === true && item.quality === '720p60') ||
      item.quality === '720p'
  )
  const video480p = videos.find(
    (item) => item.hasAudio === true && item.quality === '480p'
  )
  const video360p = videos.find(
    (item) => item.hasAudio === true && item.quality === '360p'
  )

  // console.log(video720p, video360p);
  // item.quality === "720p60" ||
  // item.quality === "720p" ||
  // item.quality === "480p" ||
  // item.quality === "360p"

  // const btnFullHD = new ButtonBuilder()
  //   .setLabel("1080p")
  //   .setStyle(ButtonStyle.Link)
  //   .setURL(`${video1080p.url ? video1080p.url : null}`);
  // const btnHD = new ButtonBuilder()
  //   .setLabel("hd")
  //   .setStyle(ButtonStyle.Link)
  //   .setURL(video720p.url);
  //   // const btn480p = new ButtonBuilder()
  // //   .setLabel("480p")
  // //   .setStyle(ButtonStyle.Link)
  // //   .setURL(`${video480p.url ? video1080p.url : null}`);
  const btn360p = new ButtonBuilder()
    .setLabel('lol')
    .setStyle(ButtonStyle.Link)
    .setURL(video360p.url)
  // // const buttons = [btnHD, btn360p];
  // // console.log(buttons);

  const rowlink = new ActionRowBuilder().addComponents(btnHD, btn360p)
  buttons.forEach((button) => {
    rowlink.addComponents(button)
  })

  await interaction.reply({
    content: `720p ${video720p.url}\n360p ${video360p.url}`
    // components: [rowlink],
  })
}

module.exports.getVideo = getVideo
