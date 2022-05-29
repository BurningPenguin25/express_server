//настройки mysql базы данных
const mysql = require('mysql')
const config = require('./../configuration')

const connection = mysql.createConnection(
    {
        host: config.HOST,
        user: config.USER,
        password: config.PASSWORD,
        database: config.DATABASE,
        port: config.PORT,
        socketPath: config.SOCKET,
    }
)


connection.connect((error)=>{
    if(error){
        console.log('Ошибка подключения к базе данных')
    } else {
        console.log('Подключено успешно ')
    }
})

module.exports = connection


//  создать базу данных / создать таблицу со значениями через консоль
// найти  socketPath (/tmp/mysql.sock) ???
// /Applications/MAMP/tmp/mysql/mysql.sock. ххх
