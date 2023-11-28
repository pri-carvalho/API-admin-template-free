const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const infolettre = new Schema({
    email: {
        type: String,
        required: [true],
        maxLength: 50,
        unique: true,
        match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('infolettre', infolettre)