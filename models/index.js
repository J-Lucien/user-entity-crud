const sequelize = require('../config/config');
const User = require('../user/user');
const Entity = require('../entity/entity');
const UserEntity = require('../userEntity/userEntity');



module.exports = {
  sequelize,
  User,
  Entity,
  UserEntity,
};
