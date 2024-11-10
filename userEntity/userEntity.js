const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const User = require('../user/user');
const Entity = require('../entity/entity');

const UserEntity = sequelize.define('UserEntity', {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
}, { timestamps: false });

User.belongsToMany(Entity, { through: UserEntity, as: 'Entities',foreignKey:'userId' });
Entity.belongsToMany(User, { through: UserEntity, as: 'Users',foreignKey:'entityId' });

User.hasMany(UserEntity,{foreignKey:'userId'});
UserEntity.belongsTo(User,{foreignKey:'userId'});
Entity.hasMany(UserEntity,{foreignKey:'entityId'});
UserEntity.belongsTo(Entity,{foreignKey:'entityId'});


module.exports = UserEntity;
