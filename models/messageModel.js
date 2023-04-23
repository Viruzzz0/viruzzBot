const { model, Schema } = require('mongoose')

// Crea un modelo de usuario
const fileSchema = new Schema({
  id: String,
  bot: Boolean,
  username: String,
  discriminator: String,
  avatar: String,
  channelId: String,
  channelName: String,
  content: String,
  createdTimestamp: Number,
  messageDate: Date,
  embeds: Object,
  commandAction: Object,
  guild: Object
})

const schemaModelMessage = (name) => model(name, fileSchema)

module.exports.schemaModelMessage = schemaModelMessage
