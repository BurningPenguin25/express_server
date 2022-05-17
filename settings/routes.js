
module.exports =(app) =>{

    const usersController = require('./../controller/userController')


    app.route('/users').get(usersController.getAllUsers) // маршрут получения данных(users) с БД методом get
    app.route('/users/add').post(usersController.signup) // маршрут отправления данных в БД и добавление
}