const express = require('express')
const bodyParser = require('body-parser')
const massive = require('massive')
const controller = require('./controller.js')
require('dotenv').config()
const session = require('express-session')
const bcrypt = require('bcrypt')
const numOfSaltRounds = 12

const app = express()
app.use(bodyParser.json())
app.use(session ({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
}))
app.use(express.static(`${__dirname}/../build`));

app.post('/api/auth/register', controller.create)
app.post('/api/auth/login', controller.login)
app.post('/api/auth/logout', controller.logout)
app.get('/api/posts/:userid', controller.join)
app.get('/api/auth/me', controller.me)
app.delete('/api/profile/:id', controller.delete)

const PORT = 4000
app.listen(PORT, () =>  console.log(`Server is listening on port: ${PORT}`))