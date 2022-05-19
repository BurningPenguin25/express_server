const usersController = require("./../controller/userController");
module.exports =(app) => {
    const usersController = require('./../controller/userController')

    app.route('/users').get(usersController.get)
    app.route('/auth/add').post(usersController.add)
    app.route('/signin').get(usersController.signin)
}
