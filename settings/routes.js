
module.exports =(app) =>{

    const usersController = require('./../controller/userController')

    app.route('/api/users').get(usersController.getAllUsers) // маршрут получения данных(users) с БД методом get
    app.route('/api/auth/signup').post(usersController.signup) // маршрут отправления данных в БД и добавление
}