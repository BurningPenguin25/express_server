
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

exports.add = (req, res) => {
   const sql = " INSERT INTO `dbtable`(`name`, `mail`) VALUES('"+ req.query.name +"', '" + req.query.mail + "')";
db.query(sql, (error, results)=> {
    if (error) {
        console.log('ошибка', error)
    } else {
response.status(results, res)
    }
})
    console.log(req.query);
}