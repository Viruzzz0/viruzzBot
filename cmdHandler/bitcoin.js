const Discord = require('discord.js');
const fetchData = require('../fetchdata/fetchdata');
const API = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

module.exports = {
    name: 'bitcoin',
    alias: [],

    execute (client,message,args){
        const anotherFunction = async (url_api) => {
            try {
                const bitcoin = await fetchData(url_api);

                message.channel.send (`${bitcoin[0].current_price}`);
            } catch (error) {
                console.error(error);
            }
        }
        anotherFunction(API);
    }
}