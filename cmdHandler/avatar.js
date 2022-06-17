const Discord = require('discord.js');

module.exports = {
    name: 'avatar',
    alias: [],

    execute (client,message,args){
        message.reply(message.author.displayAvatarURL());
    }
}