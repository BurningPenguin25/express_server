
const response = require('./../response')
const db = require('./../settings/db')
const bcrypt = require('bcryptjs')

// получение данных с БД
exports.getAllUsers = (req, res) =>{
    db.query('SELECT `ID`, `first_name`, `second_name`, `mail`, `password`  FROM `auth_base`', (error, rows, fields) =>{ // получение указанных данных  из БД auth_base
        if(error){
  response.status(404, error, res)
        } else {
            response.status(200, rows, res)
        }

    })
}


// отправка значений в БД
exports.signup = (req, res) =>{

    // проверка пользователя на регистрацию: регистрировался до этого или нет /  есть в БД или нет
    db.query("SELECT `ID`, `first_name`, `second_name`, `mail`, `password` FROM `auth_base` WHERE `email` = '" + req.body.email +  "'", (error, rows, fields) =>{
        if(error){
         response.status(400, error, res)
        } else if(typeof rows !== 'undefined' && rows.length > 0){ //  проверка пользователя на наличие
         console.log(rows)
            const row = JSON.parse(JSON.stringify(rows))
            row.map(elem => { // перебор данных email/name на поиск по совпадению
                response.status(302, {message: ' пользователь с таким именем/email уже зарегистрирован'}, res)
                return true
            })
        } else {
            const first_name = req.body.first_name //  вместо column1 может быть name/id/email/password   или что то другое // уточнить
            const second_name = req.body.second_name
            const mail = req.body.mail
            const salt = bcrypt.hashSync(7)
            const password = bcrypt.hashSync(req.body.password, salt)

         response.status(202, 'Пользователь зарегистрирован', res )

            const sql = "INSERT INTO `auth_base` (`first_name`, `second_name`, `mail`, `password`)  VALUES( '" + first_name +"', '" + second_name + "', '" + mail + "', '" + password + "') "; // отправка полей данных в базу данных на сервер(название таблицы, названия полей)
            db.query(sql, (error, results) => {
            if(error){
                  response.status(400, error, res )
            } else {
                response.status(200, {message: 'Регистрация прошла успешно', results},res)
                        }
            })
        }
    })


}