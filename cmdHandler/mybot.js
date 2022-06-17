const Discord = require('discord.js');

module.exports = {
    name: 'mybot',
    alias: [],

    execute (client,message,args){
        message.channel.send({ content: `https://discord.com/developers/applications/834249101414760448/information` });
    }
}