const Discord = require('discord.js');

module.exports = {
    name: 'mybot',
    alias: ['mb'],

    async execute (client,message,args){

        const rowlink = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setLabel('Link')
            .setStyle('LINK')
            .setURL('https://discord.com/developers/applications/834249101414760448/information')
        )

        const m = await message.channel.send({ content: 'aqui esta mi coso', components: [rowlink]})

        // message.channel.send({ content: `https://discord.com/developers/applications/834249101414760448/information` });
    }
}