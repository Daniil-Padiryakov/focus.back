import User from "../models/user.js";
import bcrypt from "bcryptjs";
import ApiError from "../exceptions/api-error.js";
import jwt from "jsonwebtoken";

const generateAccessToken = (id) => {
    return jwt.sign({id}, process.env.JWT_ACCESS_SECRET, {expiresIn: "24h"} )
}

class UserService {
    async registration(email, password) {
        const candidate = await User.findOne({email})
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
        }

        const hashPassword = await bcrypt.hash(password, 7)

        const user = await User.create({email, password: hashPassword})
        return user
    }

    async login(email, password) {
        const user = await User.findOne({email})
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }

        const token = generateAccessToken(user._id)
        return {token, user: user._id}
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await User.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }
}

export default new UserService()