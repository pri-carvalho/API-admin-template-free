"use strict"

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth')
const projectRoutes = require('./routes/project')
const userRoutes = require('./routes/user')
const contactRoutes = require('./routes/contact')
const infolettreRoutes = require('./routes/infolettre')
const errorController = require('./controllers/errorController')

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    )
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    next()
})
app.use(cors({
    origin: 'https://projet-nadame.vercel.app/'
}))
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use(authRoutes)
app.use(userRoutes)
app.use(contactRoutes)
app.use(infolettreRoutes)
app.use(projectRoutes)
app.use(errorController.getError)
app.use(errorController.logErrors)

const PORT = process.env.PORT || 3000
const MONGOOSE = process.env.MONGOOSE
mongoose.connect(MONGOOSE)
    .then(() => {
        console.log('Data base connected')
        app.listen(PORT, () => {
            console.log('Server is up and running')
        })
    })
    .catch(err => {
        console.log('Data base connection error', err)
    })