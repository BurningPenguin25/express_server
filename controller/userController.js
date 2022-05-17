

const response = require('./../response')
const db = require('./../settings/db')

// получение данных с БД
exports.users = (req, res) =>{
    db.query(' SELECT * FROM `users`', (error, rows, fields) =>{ // получение данных с сервера
        if(error){
            console.log(error)
        } else {
            response.status(rows, fields)
        }

    })
}

// отправка значений в БД
exports.add = (req, res) =>{

    const sql = "INSERT INTO `db_name` (`string-1`, `string-2`, `string-3`)  VALUES('" + req.query.string-1 +"', '" + req.query.string-2 + "', '" + req.query.string-3 + "') // отправка полей данных в базу данных на сервер(название таблицы, названия полей)
        db.query(sql, (error, results) => {
if(error){
    console.log(error)
} else {
    response.status(results,res)
            }
        })
}