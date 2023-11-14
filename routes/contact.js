const express = require('express')
const router = express.Router()
const { sendEmail } = require('../config/nodemailer')

router.post('/contact', (req, res, next) => {
  const { firstName, lastName, email, content, phoneNumber, subject } = req.body
  if (firstName === '' || lastName === '' || email === '' || content === '') {
    res.status(400).json({ error: 'Incomplete fields' })
  } else {
    sendEmail(firstName, lastName, email, content, phoneNumber, subject)
    res.status(200)
  }
})

module.exports = router