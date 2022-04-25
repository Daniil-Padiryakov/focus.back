const sequelize = require('../../db')
const {DataTypes} = require('sequelize')
const Category = require("./category");
const Pomodoro = require("./pomodoro");

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, required: true},
    password: {type: DataTypes.STRING},
})

User.hasMany(Category)
Category.belongsTo(User)

User.hasMany(Pomodoro)
Pomodoro.belongsTo(User)

module.exports = User
