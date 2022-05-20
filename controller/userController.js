const response = require('./../response')
const db = require('./../settings/db')
const jwt = require('jsonwebtoken')
const cnfg = require('./../settings/configuration')
const bcrypt = require('bcryptjs')

// user_data - название таблицы

// id |first_name | second_name | email  | password

exports.get = (req, res) =>{
    db.query('SELECT `id`, `first_name`, `second_name`, `email`, `password` FROM `user_data`', (error, rows, fields) =>{ // добавлено
        if(error){
            response.status(400, error, res)
        } else {
            response.status(200, rows, res)
        }
    })
} // работает


exports.add = (req, res) => {
    db.query(" SELECT `first_name`, `second_name`, `email`, `password` FROM `user_data` WHERE `email` = '"+ req.body.email +"'", (error, rows, fields) =>{   // добавлено
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
            const fname = req.body.first_name
            const sname = req.body.second_name
            const email = req.body.email
            const salt  = bcrypt.genSaltSync(7)
            const password = bcrypt.hashSync(req.body.password, salt) // => отправляется в sql запрос  '" + password + "'

            // const name = req.body.name !== '' ? req.body.name : "Не указал" // заполнение таблицы, в случае если не указал имя или что то еще
            const sql = " INSERT INTO `user_data` (`first_name`, `second_name`, `email`, `password`  ) VALUES('" + fname + "', '" + sname + "', '" + email + "', '" + password + "') ";
            db.query(sql, (error, results)=> {
                if (error) {
                    response.status(400, error, res)
                } else {
                    response.status(200, {message: 'регистрация прошла успешно', results}, res)
                }
            })
        }
    })
}


exports.signin = (req, res) =>{
    db.query(" SELECT `id`, `first_name`, `second_name`, `email`, `password` FROM `user_data` WHERE `email` = '"+ req.body.email +"'", (error, rows, fields) =>{
        if (error) {
            response.status(400, error, res)
        }else if(rows.length <= 0 ){
            response.status(401, 'Пользователь  не найден', res)
        } else {
            const rws = JSON.parse(JSON.stringify(rows))
            rws.map(rws => {
            const password = bcrypt.compare(req.body.password, rws.password) // установить значение пароль  в базу данных
                if(password){
                    const token = jwt.sign(
                        {
                        id: rws.id,
                        email: rws.email
                         },
                         cnfg.JWT ,
                        {expiresIn: 120 * 120} //  уточнить время
                    )
                    response.status(200,  {token: token}, res)
                } else{
                    response.status(401,  {message: 'Пароль введен некорректно!'}, res)
                }
                return true
            })
        }
    })
}




// добавить значение id firstname secondname mail password
// создать новую базу данных
//обновить таблицу в БД и добавить: id firstname secondname mail password

// CREATE DATABASE auth_base;

// CREATE TABLE user_data(
//     id MEDIUMINT NOT NULL AUTO_INCREMENT,
//     PRIMARY KEY (id),
//     first_name VARCHAR(25) NOT NULL,
//     second_name VARCHAR(25) NOT NULL,
//     email VARCHAR(25) NOT NULL,
//     password VARCHAR(25) NOT NULL);