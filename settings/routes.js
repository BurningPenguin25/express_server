
module.exports =(app) => {
    const usersController = require('./../controller/userController')
    const postController = require('./../controller/postcontroller')
    const passport = require('passport')

    app
        .route('/users')
        .get(passport.authenticate('jwt', {session: false}), usersController.get)


    app.route('/auth/add').post(usersController.add)
    app.route('/signin').get(usersController.signin)
    app.route('/webpage').get(passport.authenticate('jwt', {session: false}), postController.getposts)


}
