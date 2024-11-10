const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(80),
    allowNull: false,
    validate: {
      len: {
        args: [1, 80],
        msg: "[name] doit contenir au moins 1 caractère et au maximum 80 caractères."
      },
      notEmpty: {
        msg: "[name] ne peut pas être vide."
      }
    }
  },
  firstName: {
    type: DataTypes.STRING(50),
    allowNull: true,
    validate: {
      len: {
        args: [0, 50],
        msg: "[firstName] ne doit pas dépasser 50 caractères."
      }
    }
  },
  language: {
    type: DataTypes.STRING(2),
    allowNull: true,
    validate: {
      len: {
        args: [0, 2],
        msg: "[language] ne doit pas dépasser 2 caractères."
      }
    }
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      len: {
        args: [1, 100],
        msg: "[email] doit contenir au maximum 100 caractères."
      },
      isEmail: {
        msg: "[email] doit être une adresse email valide."
      },
      notEmpty: {
        msg: "[email] ne peut pas être vide."
      }
    }
  },
  password: {
    type: DataTypes.STRING(250),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "[password] ne peut pas être vide."
      },
      len: {
        args: [8, 250],
        msg: "[password] doit contenir au moins 8 caractères."
      }
    }
  },
  lastLogin: {
    type: DataTypes.DATE,
    validate: {
      isDate: {
        msg: "[lastLogin] doit être une date valide."
      },
      isNotFuture(value) {
        if (value && value > new Date()) {
          throw new Error("[lastLogin] ne peut pas être une date future.");
        }
      }
    }
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
});



module.exports = User;
