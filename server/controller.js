const bcrypt = require('bcrypt')
const express = require('express')
const bodyParser = require('body-parser')
const massive = require('massive')
const app = express()
require('dotenv').config()
app.use(bodyParser.json())
const numOfSaltRounds = 12

massive(process.env.CONNECTION_STRING).then( dbInstance => {
    app.set('db', dbInstance)
}).catch(error => console.log('------------ MASSIVE error', error))

module.exports = {
    create(req, res) {
        const db = app.get('db');
        const { username, password } = req.body;
        const profile_pic = `https://robohash.org/${username}`
        bcrypt.hash(password, numOfSaltRounds).then(hashed => { //WRAP DATABASE FUNCTION IN BCRYPT.HASH
            db.create_user([username, hashed, profile_pic]).then(response => {
                console.log('------------ response', response)
                req.session.userid = response[0].id;
                req.session.username = response[0].username
                req.session.profile_pic = response[0].profile_pic
                res.send(response)
                }).catch(error => {
                console.log('error', error);
                res.status(500).json({ message: 'Something bad happened! '})
                });
        })
    },

    login(req, res) {
        const dbInstance = app.get('db');
        const { username, password } = req.body;
        console.log('------------ username', username)
        dbInstance.match_one([username]).then(users => {
            if (users.length) {
                console.log('------------ users', users)
            bcrypt.compare(password, users[0].password).then(passwordsMatched => {
                if (passwordsMatched) {
                req.session.userid = users[0].id;
                req.session.username = users[0].username
                req.session.profile_pic = users[0].profile_pic
                res.json(users);
            } else {
                res.status(403).json({ message: 'Wrong password' })
            }
            })
        } else {
            res.status(403).json({ message: "That user is not registered" })
        }
        });
    },

    logout(req, res) {
        req.session.destroy();
        res.status(200).send();
    },

    delete(req, res) {
        const dbInstance = app.get('db')
        const { id } = req.params
        dbInstance.delete_user([id]).then(user => 
        res.status(200).send('Success!')
        ).catch(error => console.log('------------ me error', error));
    },

    me(req, res) {
        const dbInstance = app.get('db')
        // console.log('------------ dbInstance', dbInstance)
        dbInstance.match_picture([req.session.username, req.session.profile_pic]).then(user => 
        res.status(200).json(user)
        ).catch(error => console.log('------------ me error', error));
    },

    join(req, res, next) {
        const dbInstance = req.app.get('db')
        const { userposts, search } = req.query

        if (userposts && search) {
            dbInstance.search().then(response => res.status(200).json(response)) // Needs params
            .catch(error => {res.status(500).json('Something went wrong with the server!');
            console.log('---------- error', error)})
        }

        else if (!userposts && !search) {
            dbInstance.not_author().then(response => res.status(200).json(response)) // Needs params
            .catch(error => {res.status(500).json('Something went wrong with the server!');
            console.log('---------- error', error)})
        }

        else if (!userposts && search) {
            dbInstance.not_user().then(response => res.status(200).json(response)) // Needs params
            .catch(error => {res.status(500).json('Something went wrong with the server!');
            console.log('---------- error', error)})
        }

        else if (userposts && !search) {
            dbInstance.join_tables().then(response => res.status(200).json(response))
            .catch(error => {res.status(500).json('Something went wrong with the server!');
            console.log('---------- error', error)})
        }
    }
}