

const response = require('./../response')
const db = require('./../settings/db')
const bcrypt = require('bcryptjs')

// получение данных с БД
exports.getAllUsers = (req, res) =>{
    db.query(' SELECT `column1`, `column2`, `column3`, `column4`  FROM `DBName`', (error, rows, fields) =>{ // получение указанных данных  из БД users
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
    db.query("SELECT `column1`, `column2`, `column3` `column4` FROM `DBName` WHERE `email` = '" + req.body.email +  "'", (error, rows, fields) =>{
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
            const column1 = req.body.column1 //  вместо column1 может быть name/id/email/password   или что то другое
            const column2 = req.body.column2
            const column3 = req.body.column3

            const salt = bcrypt.hashSync(7)
            const column4 = bcrypt.hashSync(req.body.column4, salt)

         response.status(202, 'Пользователь зарегистрирован', res )

            const sql = "INSERT INTO `DBName` (`column1`, `column2`, `column3`, `column3`)  VALUES( '" + column1 +"', '" + column2 + "', '" + column3 + "', '" + column4 + "')" // отправка полей данных в базу данных на сервер(название таблицы, названия полей)
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