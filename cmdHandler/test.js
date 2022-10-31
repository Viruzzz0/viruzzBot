module.exports = {
  name: "test",
  alias: ["t"],

  async execute(client, message, args) {
    const arg = args.join("").split("");
    const unidad = arg.pop();
    const time = arg.join("");
    const millToSeg = (tim) => tim / 1000;
    const secToMilg = (tim) => tim * 1000;
    const minToMilg = (tim) => tim * 60000;
    let unidadString;
    console.log(time);

    if (!args) return message.channel.send("Escribe los segundos");
    if (!unidad == "m" || !unidad == "s") return message.channel.send("Escribe la unidad");

    
    let miliseg;
    if (unidad == "m") {
      miliseg = minToMilg(time);
      unidadString = 'min'
    } else if (unidad == "s") {
      miliseg = secToMilg(time);
      unidadString = 'seg'
    }
    message.channel.send(`Timer: **${time} ${unidadString}**`);

    const div = (75 * miliseg) / 100;
    console.log(div);
    setTimeout(async () => {
      let rest
      if(unidad == "m" || time < 4) {
         rest = millToSeg(div) / 3;
      } else {
         rest = (div) / 3;
      }
      console.log(rest);
      const mgs = await message.channel.send(`Queda **${rest} ${unidadString}**`);
      // mgs.edit('a')
    }, div);

    setTimeout(async () => {
      const mgs = await message.channel.send(`BOOM!! ${client.user}`);
      // mgs.edit('a')
    }, miliseg);
  },
};
