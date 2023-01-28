const figlet = require("figlet");

module.exports = {
  name: "ascii",
  alias: [],

  execute(client, message, args) {
    function sisi(params) {
      return figlet.textSync(params, {
        font: "Standard",
        whitespaceBreak: true,
      });
    }
    // const mensaje = args.join(" ");
    let text = ''
    args.forEach((item) => {
      text = text + `${item}\n`;
    })
    message.channel.send("```" + sisi(text) + "```");
  },
};

// figlet.textSync("Boo!", {
//   font: "Standard",
//   whitespaceBreak: true,
// });
