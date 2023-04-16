const mongoose = require('mongoose')

// Configura la conexión a MongoDB Atlas

function ServerConnection () {
  mongoose.connect(`mongodb+srv://botmeado:${process.env.MONGODB_PASSWORD}@discord.lam1u69.mongodb.net/${process.env.MONGODB_DB}?retryWrites=true&w=majority`
  )
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error(err))
}

module.exports.ServerConnection = ServerConnection
