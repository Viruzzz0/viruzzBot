const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

const fetchData = require('../fetchdata/fetchdata');
const API = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=31&page=1&sparkline=false';


module.exports = {
    name: 'cripto',
    alias: ['c'],

    execute(client, message, args) {
        const anotherFunction = async (url_api) => {
            try {
                const criptoMoney = await fetchData(url_api);
                

                const search = (query) => {
                    return criptoMoney.filter((item) => {
                      return item.id === query;
                    });
                  };

                const btc = search('bitcoin');
                const eth = search('ethereum');
                const bnb = search('binancecoin');
                const sol = search('solana');
                const xmr = search('monero');
                
                // console.log(btc);
                // console.log(eth);
                // console.log(bnb);
                // console.log(sol);
                // console.log(xmr);
                
                const embed = new MessageEmbed()
                    .setTitle('Popular Criptos')
                    .setColor('NAVY')
                    .setURL('https://www.coingecko.com')
                    .setDescription('Precios actuales')
                    .addField(btc[0].name, Intl.NumberFormat().format(btc[0].current_price))
                    .addField(eth[0].name, Intl.NumberFormat().format(eth[0].current_price))
                    .addField(bnb[0].name, Intl.NumberFormat().format(bnb[0].current_price))
                    .addField(sol[0].name, Intl.NumberFormat().format(sol[0].current_price))
                    .addField(xmr[0].name, Intl.NumberFormat().format(xmr[0].current_price))
                    .setImage('https://www.bitcoin.com.mx/content/images/2020/05/Criptomonedas_pago_empleo.png')
                   .setTimestamp(Date.now());

                message.channel.send({ embeds: [embed] });
                
            } catch (error) {
                console.error(error);
            }
        }
        anotherFunction(API);
    }
}