const { EmbedBuilder } = require("discord.js");

const embed = new EmbedBuilder()
  .setTitle("gato lol")
  .setColor("Random")
  .setImage(
    `https://media.npr.org/assets/img/2021/08/11/gettyimages-1279899488_wide-f3860ceb0ef19643c335cb34df3fa1de166e2761-s1100-c50.jpg`
  )
  .setTimestamp();

exports.embed = embed;
