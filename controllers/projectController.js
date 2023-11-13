"use strict"

const project = require('../models/project')

exports.getprojects = (res, next) => {
    project.find()
        .then(project => {
            res.status(200).json({
                project: project
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

exports.getprojectId = (req, res, next) => {
    const id = req.params.id
    project.findById(id)
        .then((project) => {
            if (!project) {
                res.status(404).json({ error: 'Project not found' })
            }
            res.status(200).json({ project })
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

exports.putprojectId = (req, res, next) => {
    const id = req.params.id
    const user = req.user.userId

    user.findById(user)
        .then((user) => {
            if (user.isAdmin) {
                const updatedProject = {
                    title: req.body.title,
                    description: req.body.description,
                    portfolioImgUrl: req.body.portfolioImgUrl,
                    portfolioProjectImgUrl: req.body.portfolioProjectImgUrl,
                }
                project.findByIdAndUpdate(id, updatedProject, { new: true })
                    .then((project) => {
                        res.status(200).json({
                            project: project,
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

exports.deleteprojectId = (req, res, next) => {
    const user = req.user.userId
    const id = req.params.id

    user.findById(user)
        .then((user) => {
            if (user.isAdmin) {
                project.findByIdAndRemove(id)
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