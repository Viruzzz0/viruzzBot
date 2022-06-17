const Discord = require('discord.js');

const countFuntion = () => {
    var count = 0;
    return {
        countNum: () => {
            return ++count;
        }
    }
}

const sumarCount = countFuntion();

module.exports = {
    name: 'count',
    alias: [],

    execute (client,message,args){      
            message.channel.send(`count: ${sumarCount.countNum()}`);
    }
}