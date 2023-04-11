const mongoose = require('mongoose');

const tempSchema = new mongoose.Schema({
    first: String,
    last: String,
    email: String,
    note: String,
})

module.exports = mongoose.model('Temp', tempSchema);