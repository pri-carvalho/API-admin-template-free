"use strict"

const project = require('../models/project')
const user = require('../models/user')

exports.getProjects = (req, res, next) => {
    project.find()
        .then(projectsFound => {
            if (!projectsFound) {
                res.status(404).json({ error: 'Projects not found' })
            }
            res.status(200).json({
                projects: projectsFound
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

exports.getProjectId = (req, res, next) => {
    const id = req.params.id
    project.findById(id)
        .then((projectFound) => {
            if (!projectFound) {
                res.status(404).json({ error: 'Project not found' })
            }
            res.status(200).json({ project: projectFound })
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

exports.postProject = (req, res, next) => {
    const { title, description, portfolioImgUrl, portfolioProjectImgUrl } = req.body
    const userId = req.user.userId

    user.findById(userId)
        .then((userFound) => {
            if (!userFound) {
                res.status(404).json({ error: 'User not found' })
            } else if (userFound.isAdmin) {
                const newProject = new project({
                    title: title,
                    description: description,
                    portfolioImgUrl: portfolioImgUrl,
                    portfolioProjectImgUrl: portfolioProjectImgUrl,
                })
                newProject.save(newProject)
                    .then((projectFound) => {
                        res.status(201).json({
                            project: projectFound,
                        })
                    })
                    .catch((err) => {
                        if (!err.statusCode) {
                            err.statusCode = 500
                        }
                        next(err)
                    })
            }
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

exports.putProjectId = (req, res, next) => {
    const id = req.params.id
    const userId = req.user.userId

    user.findById(userId)
        .then((userFound) => {
            if (!userFound) {
                res.status(404).json({ error: 'User not found' })
            } else if (userFound.isAdmin) {
                const updatedProject = {
                    title: req.body.title,
                    description: req.body.description,
                    portfolioImgUrl: req.body.portfolioImgUrl,
                    portfolioProjectImgUrl: req.body.portfolioProjectImgUrl,
                }
                project.findByIdAndUpdate(id, updatedProject, { new: true })
                    .then((projectFound) => {
                        res.status(200).json({
                            project: projectFound,
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

exports.deleteProjectId = (req, res, next) => {
    const userId = req.user.userId
    const id = req.params.id

    user.findById(userId)
        .then((userFound) => {
            if (userFound.isAdmin) {
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