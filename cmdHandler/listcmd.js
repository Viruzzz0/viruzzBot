const Discord = require('discord.js');

module.exports = {
    name: 'cmd',
    alias: [],

    execute (client,message,args){
        message.channel.send(`Lista de ccomandos:
        ping
        mybot
        cripto: error
        count
        avatar
        `);
    }
}