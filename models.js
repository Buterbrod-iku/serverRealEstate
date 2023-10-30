const sequelize = require('./db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'user'}
})

const Item = sequelize.define('item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: true},
    about: {type: DataTypes.STRING, defaultValue: 'Информция отсутствует'},
    area: {type: DataTypes.STRING},
    image: {type: DataTypes.STRING, allowNull: true}
})

User.hasMany(Item)

module.exports = {
    User,
    Item
}