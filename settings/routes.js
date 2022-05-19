module.exports =(app) => {
    const usersController = require('./../controller/userController')

    app.route('/users').get(usersController.get)
    app.route('/auth/add').post(usersController.add)
}
