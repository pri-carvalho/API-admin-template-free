"use strict"

const user = require('../models/user')

exports.getUsers = (req, res, next) => {
    user.find()
        .then(usersFound => {
            if (!usersFound) {
                res.status(404).json({ error: 'Users not found' })
            }
            res.status(200).json({
                users: usersFound
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

exports.getUserId = (req, res, next) => {
    const id = req.params.id

    user.findById(id).select('-email -password')
        .then((userFound) => {
            if (!userFound) {
                res.status(404).json({ error: 'User not found' })
            }
            res.status(200).json({ user: userFound })
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

exports.getUserProfile = (req, res, next) => {
    const userId = req.user.userId

    user.findById(userId)
        .then((userFound) => {
            if (!userFound) {
                res.status(404).json({ error: 'User not found' })
            }
            res.status(200).json({
                user: userFound,
            })
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

exports.putUserId = (req, res, next) => {
    const id = req.params.id
    const userId = req.user.userId

    user.findById(userId)
        .then((userFound) => {
            if (!userFound) {
                res.status(404).json({ error: 'User not found' })
            } else if (userFound.isAdmin) {
                const updatedUser = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email
                }
                user.findByIdAndUpdate(id, updatedUser, { new: true })
                    .then((userFound) => {
                        res.status(200).json({
                            user: userFound,
                        })
                    })
                    .catch((err) => {
                        if (!err.statusCode) {
                            err.statusCode = 500
                        }
                        next(err)
                    })
            } else {
                res.status(403).json('Unauthorized')
            }
        })
}

exports.deleteUserId = (req, res, next) => {
    const userId = req.user.userId
    const id = req.params.id

    user.findById(userId)
        .then((userFound) => {
            if (!userFound) {
                res.status(404).json({ error: 'User not found' })
            } else if (userFound.isAdmin) {
                user.findByIdAndRemove(id)
                    .then(() => {
                        res.status(204).send()
                    })
                    .catch((err) => {
                        next(err)
                    })
            } else {
                res.status(403).json('Unauthorized')
            }
        })
}