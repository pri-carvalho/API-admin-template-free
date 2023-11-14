const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()

const user = process.env.MAIL_AUTH_USER
const pass = process.env.MAIL_AUTH_PASS
const host = process.env.MAIL_HOST
const port = process.env.MAIL_PORT

const transport = nodemailer.createTransport({
  host: host,
  port: port,
  auth: {
    user: user,
    pass: pass
  }
})

const sendEmail = (firstName, lastName, email, content, phoneNumber, subject) => {
  transport.sendMail({
    from: email,
    to: 'test@test.ca',
    subject: subject,
    html: `<h2>Message de ${lastName + firstName}, téléphone : ${phoneNumber}</h2>
    <h3>Adresse : ${address}</h3>
          <p>${content}</p>`
  })
    .catch(err => console.log(err))
}

exports.sendEmail = sendEmail
