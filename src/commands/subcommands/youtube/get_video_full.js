const axios = require("axios");
const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

async function get_video_full(interaction) {
  const id = interaction.options.getString("url");
  // console.log(id);
  // const options = {
  //   method: "GET",
  //   url: "https://t-one-youtube-converter.p.rapidapi.com/api/v1/createProcess",
  //   params: {
  //     url: `${id}`,
  //     format: "video",
  //     responseFormat: "json",
  //     regenerate: "true",
  //     lang: "en",
  //   },
  //   headers: {
  //     "X-RapidAPI-Key": "36590803f9msha11501751d36d00p1fea43jsn9868f6861b7d",
  //     "X-RapidAPI-Host": "t-one-youtube-converter.p.rapidapi.com",
  //   },
  // };

  // const url = await axios
  //   .request(options)
  //   .then((response) => response.data.YoutubeAPI.urlVideo)
  //   .catch(function (error) {
  //     console.error(error);
  //   });
  // console.log('ESTE ES EL URL', url);
  const btn = new ButtonBuilder()
    .setCustomId("b1")
    .setLabel("Link")
    .setStyle(ButtonStyle.Primary);

  const rowlink = new ActionRowBuilder().addComponents(btn);
  const m = await interaction.reply({
    components: [rowlink],
  });

  const ifilter = (i) => i.user.id === interaction.user.id;
  const collector = m.createMessageComponentCollector({
    filter: ifilter,
    time: 60000,
  });
  collector.on("collect", async (i) => {
    // console.log(i);
    if (i.customId === "b1") {
      await i.deferUpdate();
      // .then(console.log)
      // .catch(console.error);

      // Edita el mensaje del button (i igual a ButtonInteraction)
      i.editReply({ content: "https://yt.apilover.com/file/?hash=5d125f851767de1fd1f75225358571cc11137bedffb72f34b397676e2c1d5a086a5de88136bf6fe5ccb93f08f9afaab03d3e85ed29642b404ba806311d537f041b6db2649c5212ada6bf6d75b2905d2ace0e003c421035d3fbdb72298fe16b55657969839ffe84b63329fc02e62c0c72ba2bc9cc397a98d03815bb1d55fe6be9445ff776232bf4db23227ba7ca441e6e4652d0f7019896fc1580dea8af5e5eed0017ea33816af81c5389c78f8dc7072988055858af7dfe83ee6ca286ab7557dec40064b3ee13d06ffcec7eaa1b5ed196ca617db05bd1200b74895e294076e16c78cd1b6e6069d89ab44a24613b7fcd86246626f987539172e76fb7d4bd22a684f41e02b79f3037dbf5d24eee9dce278da7a8f076e9dcb35137d88d70b89826a960349f60d77ce0d66e8fd0d3683f3bb9fe93c0500bb3e9e0c4a77c4a2594870ca1c1335765f993156a8d083df3106f675ac546d6d77c1fabbc2814722195ce1c6c8ffb1071c2bc3616f4b864b9217eecd1a3f15424f8eb6d062c16963751ff351048047a05752b2ff3dc5854037200545f264acf034572e3aac95c381902e2c990b5dce9b1bb266a89b79577633c742cc59def7da9bb8ebe6103b6855621d9179c52529110e516c8b0b5e5e1cc9c99e026bd7fac6653e0bc935f1cf9e95f8832a9fee50f5e67ca561d1c2ce85cab345bb596efdb739fda2bceb21453a8b079db5e545d8a601d7206c4f6891c29878eea4c7127e9812b10ae68927d1477caea8d11b5f8e20d52359d19c265cde7ad6993111f82ac0d4fe0b1e31e8bf6dd4201165e08abe4dcfa6f6cd6a1f786e4168a7fcfabdf599aef6b1b9ff38558365a3d841fd274c5dc50043ded9c4d14bb9486b07429e83d7f9b814d41bc9280816d412c14e6f1825bb4e53ce55dd8af29965f868dd8dd000c86084bc2429dabc22939e5c89bd36595492179df3b95f63eb0e895504c5bba0e8add11796e6a12c8316f74bb1d98998b6be6be294b27f76d7599d2fc040d968ce49277d8ffcdc429a4f6e65026b590316f9648fc247ba5319f9837639fff6622b7ab11faf92896fca8cf012d99ee5f6f4824a2a7b3967486c1c5df035d682370b7eb2f6d6d4a92fdecbb038b76b307027edbb1eb55f60c456ed8eab06b8398ab93f18554622968af1265c455cd6af2b42a6f770bc2686d7da67cfd85ba79c1671495de2b34db51298bea37e8b7b6ffd32bef225d95ad621b12502941636449162ded7c4ebc4125f2c5113240f2776495e624524eb8cc9636b7118b3143c2965bebcfb7c26d386f1a359cda24f726d90e1febdb18f6959c3186733507b8ce18837d326b6201af14ffba8631477b5d3eeb9642f3c2a682f375899fbe71d44637bb9dd2176c89e60c10eec8b5384392a26dc30c91d87ab4c488936417ea90aab9073d85", components: [] });
    }
  });
}

module.exports.get_video_full = get_video_full;
