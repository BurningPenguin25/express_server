// настройки подключение и запуск сервера

const express = require('express') // подключение express  фреймворка для node
const app = express()
const port = 3501
const bodyParser = require('body-parser') // подключаем bodyparser  для чтения данных HTTP POST мы должны использовать модуль узла «body-parser». body-parser - это часть промежуточного программного обеспечения Express, которое читает входные данные формы и сохраняет их как объект javascript, доступный через req.body
const passport = require('passport')  // подключение passport для аутентификации по jwt

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(passport.initialize())
require('./middleware/passport')(passport)

// app.get('/', (req, res)=>{
//     res.send('Hello on server')
// })

const routes = require('./settings/routes') // установка путей для сервера
routes(app)

app.listen(port, ()=>{  // ответ после подключения сервера
    console.log('Сервер запущен... ')
})