const express = require('express')
const app = express()
const port = 3501
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// app.get('/', (req, res)=>{
//     res.send('Hello on server')
// })

const routes = require('./settings/routes')
routes(app)

app.listen(port, ()=>{
    console.log('Сервер запущен... ')
})