module.exports =(app) => {
    const indexController = require('./../controller/indexController')

    const usersController = require('./../controller/userController')
    app.route('/').get(indexController.index)
    app.route('/table').get(usersController.get)
}
