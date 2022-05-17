const express = require('express')
const app = express()
const port = process.env.PORT || 2525
const bodyparser = require('body-parser')

app.use(bodyparser.urlencoded({extended:true})) //??
app.use(bodyparser.json()) // ??


const routes = require('././settings/routes') // файл с путями которые указаны для передачи или получения их
routes(app)

app.listening(port, ()=>{ // номер порта где работает сервер
    console.log(`Server started on port ${port}`)
})




// nodemone -  перезапуск по команде в строке
// bodyparser -

//post get  запросы  -