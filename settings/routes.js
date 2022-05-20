
module.exports =(app) => {
    const usersController = require('./../controller/userController')
    const passport = require('passport')

    app
        .route('/users')
        .get(passport.authentificate('jwt', {session: false}), usersController.get)

    //13|30

    app.route('/auth/add').post(usersController.add)
    app.route('/signin').get(usersController.signin)


}
