

const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306, //  стандартный порт | заменить?
    user: 'root',
    password: 'root',
    database: 'dbtest', // название  самой базы данных
    socketPath: '/tmp/mysql.sock' // какой путь выбрать ?
})

connection.connect((error)=>{
    if(error){
        return console.log('Ошибка подключения')
    } else {
        return console.log('Подключение успешно')
    }
})
module.exports = connection