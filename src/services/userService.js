const User = require('../models/user.js')
const bcrypt = require('bcryptjs')
const ApiError = require('../exceptions/api-error.js')
const jwt = require('jsonwebtoken')
const pool = require("../db/db");
const queries = require("../db/queries/user.js");

const generateAccessToken = (id) => {
    return jwt.sign({id}, process.env.SECRET_KEY, {expiresIn: "24h"})
}

class UserService {
    async registration(email, password) {
        const candidate = await pool.query(queries.getUserByEmail, [email]).catch(err =>
            setImmediate(() => {
                throw err
            })
        )
        if (candidate.rows[0]) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
        }

        const hashPassword = await bcrypt.hash(password, 7)

        // const user = await User.create({email, password: hashPassword})
        // const u = await pool.query(queries.addUser, [email, hashPassword], async (error, results) => {
        //     if (error) throw error;
        //     // console.log(results)
        //     console.log('1')
        //     const user = await pool.query(queries.getLastUser).catch(err =>
        //         setImmediate(() => {
        //             throw err
        //         }))
        //     // console.log(user.rows[0])
        //     console.log(2)
        //     return results
        // })

        const user = await pool.query(queries.addUser, [email, hashPassword])
            .then(async res => {
                const userRow = await pool.query(queries.getLastUser).catch(err =>
                    setImmediate(() => {
                        throw err
                    }))
                return userRow.rows[0]
            }).catch(err => {
                setImmediate(() => {
                    throw err
                })
            })
        const token = generateAccessToken(user.id, user.email)
        return {token}
    }

    async login(email, password) {
        const user = await pool.query(queries.getUserByEmail, [email])
            .then(res => res.rows[0])
            .catch(err => setImmediate(() => {
                throw err
            }))

        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }

        const token = generateAccessToken(user.id, user.email)
        return {token}
    }

    // async logout(refreshToken) {
    //     const token = await tokenService.removeToken(refreshToken);
    //     return token;
    // }
    //
    // async refresh(refreshToken) {
    //     if (!refreshToken) {
    //         throw ApiError.UnauthorizedError();
    //     }
    //     const userData = tokenService.validateRefreshToken(refreshToken);
    //     const tokenFromDb = await tokenService.findToken(refreshToken);
    //     if (!userData || !tokenFromDb) {
    //         throw ApiError.UnauthorizedError();
    //     }
    //     const user = await User.findById(userData.id);
    //     const userDto = new UserDto(user);
    //     const tokens = tokenService.generateTokens({...userDto});
    //
    //     await tokenService.saveToken(userDto.id, tokens.refreshToken);
    //     return {...tokens, user: userDto}
    // }
}

module.exports = new UserService()
