const { Sequelize } = require('sequelize');
const sequelize = require('../config/Database');
const NotesModel = require('./NotesModel');
const UsersModel = require('./UsersModel');

const Notes = NotesModel(sequelize);
const Users = UsersModel(sequelize);

Users.hasMany(Notes, { foreignKey: 'userId' });
Notes.belongsTo(Users, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  Notes,
  Users
};