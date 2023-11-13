"use strict"

const user = require('../models/user')

exports.getUsers = (req, res, next) => {
    user.find()
        .then(user => {
            res.status(200).json({
                user: user
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
        .then((user) => {
            if (!user) {
                res.status(404).json({ error: 'User not found' })
            }
            res.status(200).json({ user })
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

exports.getUserProfile = (req, res, next) => {
    const user = req.user.userId
    user.findById(user)
        .then((user) => {
            res.status(200).json({
                user: user,
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
    const user = req.user.userId

    user.findById(user)
        .then((user) => {
            if (user.isAdmin) {
                const updatedUser = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email
                }
                user.findByIdAndUpdate(id, updatedUser, { new: true })
                    .then((user) => {
                        res.status(200).json({
                            user: user,
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
    const user = req.user.userId
    const id = req.params.id

    user.findById(user)
        .then((user) => {
            if (user.isAdmin) {
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