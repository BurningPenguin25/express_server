const mysql = require('mysql')
//настройки mysql базы данных
const config = require('./../settings')

const connection = mysql.createConnection( // connection или create  connection
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
        console.log('Подключилось')
    }
})

module.exports = connection


//  создать базу данных / создать таблицу со значениями через консоль

// найти  socketPath