const Discord = require('discord.js');

module.exports = {
    name: 'avatar',
    alias: [],

    execute (client,message,args){
        // message.reply(message.author.displayAvatarURL());
        let user = message.mentions.users.first() || message.author;

        const embed = new Discord.MessageEmbed()
        .setTitle(`Avatar de ${user.tag}`)
        .setImage(user.displayAvatarURL({ size: 1024, dynamic: true}))
        .setTimestamp();

        message.channel.send({ embeds: [embed] });
    }
    
}