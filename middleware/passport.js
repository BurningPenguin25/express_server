const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('./../settings/configuration')
const db = require('./../settings/db')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, (jwt_payload, done) => {
            try{
                db.query("SELECT `id`, `email`, FROM `basetable` WHERE `id` = '" + payload.id + "' ", (error, rows, fields) => {
                    if(error){
console.log(error)
                    }else{
                        const user = rows
                        if(user){
                            done(null, user)
                        }else{
                            done(null, false)
                        }
                    }
                })
            } catch(e){
                console.log(e);
            }
        })
    )
}
