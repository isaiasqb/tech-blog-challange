const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
  //instance method for password validation
  checkPswd(loginPswd) {
    return bcrypt.compareSync(loginPswd, this.password);
  }
}

User.init(
    {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    github: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5]
      }
    }
  },


  {
    hooks: {
      async beforeCreate(newInfo) {
        newInfo.password = await bcrypt.hash(newInfo.password, 10);
        return newInfo;
      },
      async beforeUpdate(updatedInfo) {
        updatedInfo.password = await bcrypt.hash(updatedInfo.password, 10);
        return updatedInfo;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  
});

module.exports = User;
