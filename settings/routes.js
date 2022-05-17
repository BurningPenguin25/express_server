
module.exports =(app) =>{
    const indexController = require('./../controller/indexController')
    const usersController = require('./../controller/userController')

    app.route('/').get(indexController.index)
    app.route('/users').get(usersController.users) // маршрут получения данных(users) с БД методом get
    app.route('/users/add').post(usersController.add) // маршрут отправления данных в БД и добавление
}