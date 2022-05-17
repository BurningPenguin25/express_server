const mysql = require('mysql')
//настройки mysql базы данных

const connection = mysql.createConnection( // connection или create  connection
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'rest',
        port: 5555,
        socketPath: 'путь к сокету'
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