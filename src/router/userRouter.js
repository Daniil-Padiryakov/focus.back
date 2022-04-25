const Router = require('express')
const {body} = require('express-validator')
const userController = require('../controllers/userController.js')
const router = new Router()

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 4, max: 32}),
    userController.registration
)

router.post('/login', userController.login)

// router.post('/logout', userController.logout)

module.exports = router
