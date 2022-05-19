const response = require('./../response')
const db = require('./../settings/db')
const jwt = require('jsonwebtoken')
const cnfg = require('./../settings/configuration')
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
    db.query(" SELECT `name`, `mail` FROM `dbtable` WHERE `mail` = '"+ req.body.mail +"'", (error, rows, fields) =>{
        if(error){
            response.status(400, error, res)
        } else if(typeof rows !== "undefined" && rows.length >0){
            const row = JSON.parse(JSON.stringify(rows))
            row.map(rws => {
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



exports.signin = (req, res) =>{
    db.query(" SELECT `name`, `mail` FROM `dbtable` WHERE `mail` = '"+ req.body.mail +"'", (error, rows, fields) =>{
        if (error) {
            response.status(400, error, res)
        }else if(rows.length <= 0 ){

            response.status(401, 'Пользователь  не найден', res)
        } else {
            const rws = JSON.parse(JSON.stringify(rows))
            rws.map(rws => {
            const password = bcrypt.compare(req.body.password, rws.password) // установить значение пароль  в базу данных
                if(password){
                    const token = jwt.sign({
                        name: rws.name,
                        mail: rws.mail
                    }, cnfg.JWT , {timeLive: 120 * 120})
                    response.status(200,  {token: token}, res)
                } else{
                    response.status(401,  {message: 'Пароль введен енкорректно!'}, res)
                }
                return true
            })
        }
    })
}


// добавить значение id firstname secondname mail password
// создать новую базу данных
//обновить таблицу в БД и добавить: id firstname secondname mail password