const express = require('express')
const app = express()
const port = process.env.PORT || 3500
const bodyparser = require('body-parser')


app.get('/', (req,res) =>{
    res.send("hello world")
})

app.use(bodyparser.urlencoded({extended:true})) //??
app.use(bodyparser.json()) // ??

const routes = require('././settings/routes') // файл с путями которые указаны для передачи или получения их
routes(app)

app.listen(port, ()=>{ // номер порта где работает сервер
    console.log(`Server started on port ${port}`)
})



// bodyparser -

//post get  запросы: post -  отправка на сервер / get получение с сервера

// socketPath найти для подключения к БД

//  /tmp/mysql.sock
// socket                                                       /tmp/mysql.sock