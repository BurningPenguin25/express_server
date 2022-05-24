// подключение и настройки базы данных mysql


const mysql = require('mysql') // подключение СУБД mysql
const cnfg = require('./../settings/configuration') // подключение настроек

const connection = mysql.createConnection({ //настройка самой базы данных
    host: cnfg.HOST,
    port: cnfg.PORT, //  стандартный порт | заменить?
    user: cnfg.USER,
    password: cnfg.PASSWORD,
    database: cnfg.BASENAME, // название  самой базы данных
})

connection.connect((error)=>{
    if(error){
        return console.log('Ошибка подключения', error)
    } else {
        return console.log('Подключение к базе данных успешно')
    }
})
module.exports = connection
