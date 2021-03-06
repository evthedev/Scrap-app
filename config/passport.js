// const Strategy = require('passport-jwt').Strategy
import {
    Strategy,
    ExtractJwt
} from 'passport-jwt'
// const ExtractJwt = require('passport-jwt').ExtractJwt
// const mongoose = require('mongoose')
import mongoose from 'mongoose'

const User = mongoose.model('users')
const keys = require('../config/keys')

const options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = keys.secretOrKey

module.exports = passport => {

    const strategy = new Strategy(options, (payload, done) => {
        User.findById(payload.id)
            .then(user => {
                if (user) {
                    return done(null, user)
                }
                return done(null, false)
            })
            .catch(err => console.log(err))
    })


    passport.use(strategy)

}
