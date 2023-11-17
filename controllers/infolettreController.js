"use strict"

const infolettre = require('../models/infolettre')
const user = require('../models/user')

exports.getInfolettres = (req, res, next) => {
    infolettre.find()
        .then(infolettresFound => {
            if (!infolettresFound) {
                res.status(404).json({ error: 'infolettres not found' })
            }
            res.status(200).json({
                infolettres: infolettresFound
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

exports.getInfolettreId = (req, res, next) => {
    const id = req.params.id
    const userId = req.user.userId

    user.findById(userId)
        .then((userFound) => {
            if (!userFound) {
                res.status(404).json({ error: 'User not found' })
            } else if (userFound.isAdmin) {

                infolettre.findById(id)
                    .then((infolettreFound) => {
                        if (!infolettreFound) {
                            res.status(404).json({ error: 'Infolettre not found' })
                        }
                        res.status(200).json({ infolettre: infolettreFound })
                    })
                    .catch((err) => {
                        if (!err.statusCode) {
                            err.statusCode = 500
                        }
                        next(err)
                    })
            }
        })
}

exports.postInfolettre = (req, res, next) => {
    const { email } = req.body

    const newInfolettre = new infolettre({
        email: email
    })
    newInfolettre.save(newInfolettre)
        .then((infolettreFound) => {
            res.status(201).json({
                infolettre: infolettreFound,
            })
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

exports.putInfolettreId = (req, res, next) => {
    const id = req.params.id
    const userId = req.user.userId

    user.findById(userId)
        .then((userFound) => {
            if (!userFound) {
                res.status(404).json({ error: 'User not found' })
            } else if (userFound.isAdmin) {
                const updatedInfolettre = {
                    title: req.body.title,
                    description: req.body.description,
                    portfolioImgUrl: req.body.portfolioImgUrl,
                    portfolioInfolettreImgUrl: req.body.portfolioInfolettreImgUrl,
                }
                infolettre.findByIdAndUpdate(id, updatedInfolettre, { new: true })
                    .then((infolettreFound) => {
                        res.status(200).json({
                            infolettre: infolettreFound,
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

exports.deleteInfolettreId = (req, res, next) => {
    const userId = req.user.userId
    const id = req.params.id

    user.findById(userId)
        .then((userFound) => {
            if (!userFound) {
                res.status(404).json({ error: 'User not found' })
            } else if (userFound.isAdmin) {
                infolettre.findByIdAndRemove(id)
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