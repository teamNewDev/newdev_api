import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      userId: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
      },
      username: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      firstName: {
        allowNull: true,
        type: DataTypes.STRING
      },
      lastName: {
        allowNull: true,
        type: DataTypes.STRING
      },
      email: {
        allowNull: true,
        unique: true,
        type: DataTypes.STRING
      },
    },
    {
      hooks: {
        beforeCreate: user => user.password && user.hashPassword(),
        beforeUpdate: user => user.password && user.hashPassword()
      }
    }
  );

  User.associate = (models) => {
    User.belongsToMany(models.Role, {
      foreignKey: 'userId',
      as: 'roles',
      through: models.UserRole
    });
    User.hasMany(models.LanguageStack, {
      foreignKey: 'userId',
      as: 'languageStacks',
    });
    User.hasMany(models.Proficiency, {
      foreignKey: 'userId',
      as: 'proficiencies',
    });
  };

  User.prototype.hashPassword = async function hashPassword() {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    return this.password;
  };

  User.prototype.validPassword = function validPassword(password) {
    return bcrypt.compare(password, this.password);
  };

  return User;
};
