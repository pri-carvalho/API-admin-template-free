const express = require('express')
const router = express.Router()
const { sendEmail } = require('../config/nodemailer')

router.post('/contact', async (req, res, next) => {
  const { firstName, lastName, email, content, phoneNumber, subject, address } = req.body
  if (firstName === '' || lastName === '' || email === '' || content === '') {
    res.status(400).json({ error: 'Incomplete fields' })
  } else {
    try {
      await sendEmail(firstName, lastName, email, content, phoneNumber, subject, address)
      res.status(200).json()
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Failed to send email' })
    }
  }
})

module.exports = router