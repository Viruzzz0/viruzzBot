const Discord = require('discord.js');
const { EmbedBuilder } = require('discord.js');

const fetchData = require('../fetchdata/fetchdata');
const API = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';


module.exports = {
    name: 'cripto',
    alias: [],

    execute (client,message,args){
        const anotherFunction = async (url_api) => {
            try {
                const criptoMoney = await fetchData(url_api);

                const embed = new Discord.EmbedBuilder

                
                    .setTitle('Popular Criptos')
                    .setColor('NAVY')
                    .setURL('https://www.coingecko.com')
                    .setDescription('Precios actuales')
                    .setAuthor('Criptomonedas')
                    .addField(criptoMoney[0].name, Intl.NumberFormat().format(criptoMoney[0].current_price))
                    .addField(criptoMoney[1].name, Intl.NumberFormat().format(criptoMoney[1].current_price))
                    .addField(criptoMoney[2].name, Intl.NumberFormat().format(criptoMoney[2].current_price))
                    .addField(criptoMoney[3].name, Intl.NumberFormat().format(criptoMoney[3].current_price))
                    .setImage('https://www.bbva.com/wp-content/uploads/2021/10/BBVA-criptomonedas-innovacion-fluctuacion-digital.png')
                   .setTimestamp(Date.now());

                message.channel.send(embed);

            } catch (error) {
                console.error(error);
            }
        }
        anotherFunction(API);
    }
}