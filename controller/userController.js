const response = require('./../response')
const db = require('./../settings/db')
// const bcrypt = require('bcryptjs')

//dbtable - название таблицы

exports.get = (req, res) =>{
    db.query('SELECT `name`, `mail` FROM `dbtable`', (error, rows, fields) =>{
        if(error){
            response.status(400, error, res)
        } else {
            response.status(200, rows, res)
        }
    })
}

exports.add = (req, res) => {
    db.query(" SELECT `name`, `mail` FROM `dbtable` WHERE `mail` = '"+ req.query.mail +"'", (error, rows, fields) =>{
        if(error){
            response.status(400, error, res)
        } else if(typeof rows !== "undefined" && rows.length >0){
            const row = JSON.parse(JSON.stringify(rows))
            row.map(rws => {
                console.log(rws)
                response.status(302, {message: 'Пользователь с таким email уже зарегистрирвоан' }, res)
                return true
            })
        } else {
            const name = req.body.name
            const mail = req.body.mail

            // const name = req.body.name !== '' ? req.body.name : "Не указал"

            // const salt  = bcrypt.genSaltSync(15)
            // const password = bcrypt.hashSync(req.body.password, salt) => отправляется в sql запрос  '" + password + "'

            const sql = " INSERT INTO `dbtable` (`name`, `mail`) VALUES('" + name + "', '" + mail + "') ";
            db.query(sql, (error, results)=> {
                if (error) {
                    response.status(400, error, res)
                } else {
                    response.status(200, {message: 'регистрация прошла успешна', results}, res)
                }
            })
        }
    })
}