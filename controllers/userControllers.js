const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const {User, Item} = require('../models')
const jwt = require("jsonwebtoken")

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id: id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserControllers{
    async registration(req, res, next) {
        const {email, password, role} = req.body

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body

        const user = await User.findOne({where: {email}})
        if(!user){
            return next(ApiError.internal('Пользователь с таким именем не найден'))
        }

        let compare = bcrypt.compareSync(password, user.password)
        if(!compare){
            return next(ApiError.internal('Указан неверный пароль'))
        }

        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserControllers()