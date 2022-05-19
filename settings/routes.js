module.exports =(app) => {
    const indexController = require('./../controller/indexController')

    const usersController = require('./../controller/userController')
    app.route('/users').get(indexController.index)
    app.route('/users/table').post(usersController.add)
}
