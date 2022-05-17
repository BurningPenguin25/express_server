// const JWTstrategy = require('passport-jwt').Strategy
// const ExtractJwt = require('passport-jwt').ExtractJwt
// const config = require('./../config')
// const db = require('./../settings/db')
//
// const options = {
//     _jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
//     _secretOrKey: config.jwt
// }
//
// module.exports = passport => {
//     passport.use(
//         new JWTstrategy(options, (payload, done)=>{
//             try{
//                    db.query("SELECT `id`, `mean2`, `mean3` FROM `table` WHERE `id`='" + payload.userid + "'")            //   проверка наличия пользователя в БД | userid хранится в папке  UserController
//             } catch(e){
//                 console.log(e)
//             }
//         })
//     )
// }