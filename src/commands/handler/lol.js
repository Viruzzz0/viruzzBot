module.exports = {
  name: "lol",
  alias: [],

  execute(client, message, args) {
    const mensaje = args.join(" ");
    if (!mensaje) return message.channel.send("Escribe algo");

    // Quita el ultimo elemento del array args y lo
    // guarda (numero de veces que se repite el mensaje)
    let rep = args.pop();

    // Vuelve el array args y lo guarda como string
    const msg = args.join(" ");

    // console.log(`${msg}`);

    // const repetidor = (numrep) => {
    //     let i = 0;
    //     while (i < numrep){
    //         var gg = msg +
    //         console.log(gg);
    //         i++;
    //     }
    //     return gg
    // }

    let num = 0;
    while (num < rep) {
      setTimeout(function () {
        message.channel.send(`${msg} ${msg} ${msg} ${msg} `);
      }, 700);
      num++;
    }
    message.delete();
  },
};
