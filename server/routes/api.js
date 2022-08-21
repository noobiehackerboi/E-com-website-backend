const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const userSchema = require('../models/model')
const mongoose = require('mongoose')

const db = "mongodb+srv://<username>:<password>@cluster0.<link>.mongodb.net/<database>?retryWrites=true&w=majority"

mongoose.connect(db, err => {
    if (err) {
        console.log(err)
    } else {
        console.log('Connected to DataBase')
    }
})

function verify_user(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized Request')
    }
    let token_user = req.headers.authorization.split(' ')[1]
    if (token_user === 'null') {
        return res.status(401).send('Unauthorized Request')
    }
    let payload = jwt.verify(token_user, "Secret_Key")
    if (!payload) {
        return res.status(401).send('Unauthorized Request')
    }
    req.user_id = payload.subject
    next()
}

router.get('/', (req, res) => {
    res.send('hello from api route')
})

router.post('/user_register', (req, res) => {
    let userData = req.body
    let users = new userSchema(userData)
    users.save((err, registeredUser) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(registeredUser)
        }
    })
})

router.post('/user_login', (req, res) => {
    let userData = req.body

    users.findOne({ email: userData.user_id }, (err, user) => {
        if (err) {
            console.log(err)
        } else {
            if (!user) {
                res.status(401).send('Invalid User')
            } else {
                if (userData.password !== user.password) {
                    res.status(401).send('Invalid Password')
                } else {
                    let payload = { subject: user.user_id }
                    let token_user = jwt.sign(payload, "Secret_Key")
                    res.status(200).send({ token_user })
                }
            }
        }
    })
})

router.get('/dashboard_admin', verify_user, (req, res) => {

})

module.exports = router
