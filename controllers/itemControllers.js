const {Item} = require('../models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class ItemControllers{
    async create(req, res, next) {
        try{
            const {name, about, area} = req.body
            const {image} = req.files
            let fileName = uuid.v4() + ".jpg"

            await image.mv(path.resolve(__dirname, '..', 'static', fileName))
            const item = await Item.create({name, about, area, image: fileName})

            return res.json(item)
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const items = await Item.findAll()
        return res.json(items)
    }

    async getOne(req, res) {
        res.json({massage: '3'})
    }
}

module.exports = new ItemControllers()