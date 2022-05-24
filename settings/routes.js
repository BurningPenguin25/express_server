// маршруты и методы запросов данных


module.exports =(app) => {
    const usersController = require('./../controller/userController')
    const postController = require('./../controller/postcontroller')
    const passport = require('passport')

    app
        .route('/users')
        .get(passport.authenticate('jwt', {session: false}), usersController.get)  // подключение и спользование passport


    app
        .route('/auth/add') // путь по которому делается запрос http://localhost:3501/users
        .post(usersController.add) // метод по которому делается запрос( файл в структуре и команда в строке файла)


    app.route('/signin').get(usersController.signin)
    app.route('/webpage').get(passport.authenticate('jwt', {session: false}), postController.getposts)


}
