"use strict"

const user = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

exports.postLogin = (req, res, next) => {
    const { email, password } = req.body
    let userFound
    user.findOne({ email })
        .then((user) => {
            if (!user) {
                const error = new Error('User not found')
                error.statusCode = 404
                throw error
            }
            userFound = user
            return bcrypt.compare(password, userFound.password)
        })
        .then(valid => {
            if (!valid) {
                const error = new Error('Wrong password !')
                error.statusCode = 401
                throw error
            }
            const token = jwt.sign(
                {
                    email: userFound.email,
                    name: userFound.name,
                    userId: userFound._id.toString()
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
                        isAdmin: false
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