
const response = require('./../response')
const db = require('./../settings/db')

//dbtable - название таблицы

exports.get = (req, res) =>{
    db.query('SELECT * FROM `dbtable`', (error, rows, fields) =>{
        if(error){
            console.log(error)
        } else {
            response.status(rows, res)
        }
    })
}