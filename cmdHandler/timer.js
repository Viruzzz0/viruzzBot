module.exports = {
  name: "timer",
  alias: ["time"],

  async execute(client, message, args) {
    const arg = args.join("").split("");
    const unidad = arg.pop();
    const time = arg.join("");
    const secToMilg = (tim) => tim * 1000;
    const minToMilg = (tim) => tim * 60000;
    const hrToMilg = (tim) => tim * 3600000;

    const formatSeg = (ms) => (ms / 1000) % 60;
    const formatMin = (ms) => (ms / 60000) % 60;
    const formatHr = (ms) => (ms / 3600000) % 24;
    
    let mili;
    let unidadString;

    if (!args) return message.channel.send("Escribe los segundos");
    if (!unidad == "m" || !unidad == "s" || !unidad == "h")
      return message.channel.send("Escribe la unidad");

    // Transforma el tiempo puesto por el user y lo pasa a milisegundos
    // Elige la unidad para devolverlo en string
    if (unidad == "s") {
      mili = secToMilg(time);
      unidadString = "seg";
    } else if (unidad == "m") {
      mili = minToMilg(time);
      unidadString = "min";
    } else if (unidad == "h") {
      mili = hrToMilg(time);
      unidadString = "horas";
    }

    // Indica el tiempo puesto a temporizar
    message.channel.send(`Timer: **${time} ${unidadString}**`);

    const div = (75 * mili) / 100;
    setTimeout(async () => {
      const elemet0 = unidad == "s" && time < 60;
      const elemet1 = unidad == "m" && time < 4;
      const elemet2 = unidad == "m" && time < 60;
      const elemet3 = unidad == "h" && time < 4;
      const elemet4 = unidad == "h" && time < 24;
      let rest;

      if (elemet0 || elemet1) {
        rest = formatSeg(mili - div);
        unidadString = "seg";
        // console.log("elemet", mili - div);
      } else if (elemet2 || elemet3) {
        rest = formatMin(mili - div);
        unidadString = "min";
        // console.log("elemet2", mili - div);
      } else if (elemet4) {
        rest = formatHr(mili - div);
        unidadString = "horas";
        // console.log("elemet4", mili - div);
      }

      const mgs = await message.channel.send(
        `Queda **${rest} ${unidadString}**`
      );
      // mgs.edit('a')
    }, mili);

    setTimeout(async () => {
      const mgs = await message.channel.send(`BOOM!! ${client.user}`);
      // mgs.edit('a')
    }, mili);
  },
};
