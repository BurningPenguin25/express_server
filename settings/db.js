

const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306, //  стандартный порт | заменить?
    user: 'root',
    password: 'BurningPenguin25b',
    database: 'dbtest', // название  самой базы данных
})

connection.connect((error)=>{
    if(error){
        return console.log('Ошибка подключения', error)
    } else {
        return console.log('Подключение к базе данных успешно')
    }
})
module.exports = connection
