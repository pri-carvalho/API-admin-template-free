const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const project = new Schema({
    title: {
        type: String,
        required: [true],
        minLength: 3,
        maxLength: 300
    },
    description: {
        type: String,
        required: [true],
        minLength: 3,
        maxLength: 300
    },
    portfolioImgUrl: {
        type: String,
        required: [true],
        maxLength: 255
    },
    portfolioProjectImgUrl: {
        type: Array,
        required: [true],
        maxLength: 255
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('project', project)