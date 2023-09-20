const mongoose = require('mongoose')

const schema = mongoose.Schema({
data : mongoose.Schema.Types.Mixed,
})

const cpu = mongoose.model('cpu',schema)

module.exports = cpu
