const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');



const user = new Schema({
    firstname: {
        type: String,
        required: [true],
        minLength: 3,
        maxLength: 50
    },
    lastname: {
        type: String,
        required: [true],
        minLength: 3,
        maxLength: 50
    },
    email: {
        type: String,
        required: [true],
        maxLength: 50,
        unique: true,
        match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    },
    password: {
        type: String,
        required: function () {
            return this.isNew;
        },
        minLength: 6
    },
    isAdmin: {
        type: Boolean,
        value: "false"
    }
},
    { timestamps: true }
)

user.methods.isValidPassword = function (password) {
    return bcrypt.compare(password, this.password)
        .then((isMatch) => {
            return isMatch
        })
        .catch((err) => {
            throw err
        })
}

module.exports = mongoose.model('user', user)