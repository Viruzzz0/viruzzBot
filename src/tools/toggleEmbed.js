class ToggleEmbed {
  constructor ({ collector, embed, actionRow, images }) {
    this.collector = collector
    this.embed = embed
    this.actionRow = actionRow
    this.images = images
  }

  async action (count) {
    return {
      on: async () => {
        console.log(count)
        if (this.collector.customId === 'next') {
          if (count >= this.images.length - 1) --count

          ++count
          await this.collector.deferUpdate()
          this.embed.setImage(this.images[count])
          this.embed.setFooter({
            text: `Image ${count}`
          })
          this.collector.editReply({
            embeds: [this.embed],
            components: [this.actionRow]
          })
        } else if (this.collector.customId === 'preview') {
          if (count <= 0) ++count

          --count
          await this.collector.deferUpdate()
          this.embed.setImage(this.images[count])
          this.embed.setFooter({
            text: `Image ${count}`
          })
          this.collector.editReply({
            embeds: [this.embed],
            components: [this.actionRow]
          })
        }
        console.log(count)
      }
    }
  }
}

module.exports.ToggleEmbed = ToggleEmbed
