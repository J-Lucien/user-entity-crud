const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Entity = sequelize.define('Entity',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            len: {
            args: [1, 50],
            msg: "[name] doit contenir au moins 1 caractère et au maximum 50 caractères."
            },
            notEmpty: {
            msg: "[name] ne peut pas être vide."
            }
        }
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: true, 
    },
    siret:{
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    keyLicence:{
        type: DataTypes.STRING(250),
        allowNull: true,
    },
    website:{
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        validate: {
          isDate: {
            msg: "[createdAt] doit être une date valide."
          },
          isNotFuture(value) {
            if (value > new Date()) {
              throw new Error("[createdAt] ne peut pas être une date future.");
            }
          }
        }
      }
})




module.exports = Entity;