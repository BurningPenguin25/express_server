const response = require('./../response')
const db = require('./../settings/db')
const jwt = require('jsonwebtoken')
const cnfg = require('./../settings/configuration')
const bcrypt = require('bcryptjs')

// user_data - название таблицы
// id |first_name | second_name | email  | password


//получение данных из БД методом .get
exports.get = (req, res) =>{ // запрос экспорта данных
    db.query('SELECT `id`, `first_name`, `second_name`, `email`, `password` FROM `user_data`', (error, rows, fields) =>{ // вывод данных методом SELECT
        if(error){ // вывод при ошибке
            response.status(400, error, res)
        } else { // вывод при успешном ответе
            response.status(200, rows, res)
        }
    })
} // работает


// добавление данных в базу данных
exports.add = (req, res) => {
    db.query(" SELECT `first_name`, `second_name`, `email`, `password` FROM `user_data` WHERE `email` = '"+ req.body.email +"'", (error, rows, fields) =>{   // добавлено
        if(error){ // если ошибка при добавлении
            response.status(400, error, res) // выводим сообщение об ошибке
        } else if(typeof rows !== "undefined" && rows.length >0){ // проверка наличия пользователя: если данные есть(rows.length >0) тогда делаем перебор методом map
            const row = JSON.parse(JSON.stringify(rows)) // делаем преобразование отправляемых данных
            row.map(rws => { // перебор массива
                console.log(rws)
                response.status(302, {message: 'Пользователь с таким email уже зарегистрирвоан' }, res) // ответ о наличии и регистрации даннх
                return true
            })
        } else {
            const fname = req.body.first_name //Объект req.body позволяет получать доступ к данным в строке или объекте JSON со стороны клиента. Обычно используется в методах post / put
            const sname = req.body.second_name
            const email = req.body.email
            const salt  = bcrypt.genSaltSync(7) // пакет по кодировке пароля
            const password = bcrypt.hashSync(req.body.password, salt) // => отправляется в sql запрос  '" + password + "'

            // const name = req.body.name !== '' ? req.body.name : "Не указал" // заполнение таблицы, в случае если не указал имя или что то еще

            const sql = " INSERT INTO `user_data` (`first_name`, `second_name`, `email`, `password`  ) VALUES('" + fname + "', '" + sname + "', '" + email + "', '" + password + "') "; // непосредственно само добавление даннх в базу
            db.query(sql, (error, results)=> {
                if (error) {
                    response.status(400, error, res)
                } else {
                    response.status(200, {message: 'регистрация прошла успешно', results}, res)
                }
            })
        }
    })
}

// аутентификация уже зарегистрированного пользователя
exports.signin = (req, res) =>{
    db.query(" SELECT `id`, `first_name`, `second_name`, `email`, `password` FROM `user_data` WHERE `email` = '"+ req.body.email +"'", (error, rows, fields) =>{ // запрос и получение  указаныых данных из БД
        if (error) {
            response.status(400, error, res)
        }else if(rows.length <= 0 ){ // если строка данных пуста, то выводим сообщение
            response.status(401, 'Пользователь  не найден', res)
        } else {
            const rws = JSON.parse(JSON.stringify(rows))
            rws.map(rws => {
            const password = bcrypt.compare(req.body.password, rws.password) // использование пакета bcrypt и метод compare и сравнение пароля указанного и уже находящегося в базе данных
                if(password){ // если пассворд верен(true) тогда указываем токен
                    const token = jwt.sign( // указываем токен JWT: header, payload и  sighn
                        {
                        id: rws.id, // данные записываемые в токен: id
                        email: rws.email // данные записываемые в токен: mail
                         },
                         cnfg.JWT ,
                        {expiresIn: 120 * 120} //  время существования токена
                    )
                    response.status(200,  {token: token}, res) // если все введено верно
                } else{
                    response.status(401,  {message: 'Пароль введен некорректно!'}, res) // если ошибка
                }
                return true
            })
        }
    })
}
