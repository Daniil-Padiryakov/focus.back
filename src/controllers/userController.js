const { validationResult } = require('express-validator')
const userService = require('../services/userService.js')
const ApiError = require('../exceptions/api-error.js')

class userController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }

            const {email, password} = req.body;
            const userData = await userService.registration(email, password);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    // async logout(req, res, next) {
    //     try {
    //         const {refreshToken} = req.cookies;
    //         const token = await userService.logout(refreshToken);
    //         res.clearCookie('refreshToken');
    //         return res.json(token);
    //     } catch (e) {
    //         next(e);
    //     }
    // }
    //
    // async refresh(req, res, next) {
    //     try {
    //         console.log(req)
    //         const {refreshToken} = req.cookies;
    //         const userData = await userService.refresh(refreshToken);
    //         res.cookie('refreshToken', userData.refreshToken, {
    //             sameSite: 'none',
    //             maxAge: 30 * 24 * 60 * 60 * 1000,
    //             secure: true,
    //             httpOnly: true})
    //         return res.json(userData);
    //     } catch (e) {
    //         next(e);
    //     }
    // }
}

module.exports = new userController()
