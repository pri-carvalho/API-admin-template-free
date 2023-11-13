"use strict"

const user = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

exports.postLogin = (req, res, next) => {
    const { email, password } = req.body
    let user
    user.findOne({ email })
        .then((userFound) => {
            if (!userFound) {
                const error = new Error('User not found')
                error.statusCode = 404
                throw error
            }
            user = userFound
            return bcrypt.compare(password, user.password)
        })
        .then(valid => {
            if (!valid) {
                const error = new Error('Wrong password !')
                error.statusCode = 401
                throw error
            }
            const token = jwt.sign(
                {
                    email: user.email,
                    name: user.name,
                    userId: user._id.toString()
                },
                process.env.SECRET_JWT,
                { expiresIn: '1h' }
            )
            res.status(200).json({ token: token })
        })
        .catch(err => {
            next(err)
        })
}

exports.postSignup = (req, res, next) => {
    const { firstname, lastname, email, password } = req.body
    user.findOne({ email })
        .then((existingUser) => {
            if (existingUser) {
                return res.status(409).json({ error: 'Email already exists' })
            }
            bcrypt.hash(password, 10)
                .then((hashedPassword) => {
                    const newUser = new user({
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        password: hashedPassword,
                        isAdmin: false,
                        cart: [],
                    })
                    return newUser.save()
                })
                .then((createdUser) => {
                    res.status(201).json({
                        message: 'User created successfully',
                        userId: createdUser.id,
                    })
                })
                .catch((err) => {
                    if (!err.statusCode) {
                        err.statusCode = 500
                    }
                    next(err)
                })
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}