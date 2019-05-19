import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const LanguageStack = sequelize.define(
    'LanguageStack',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
      userId: {
        allowNull: false,
        type: DataTypes.STRING
      },
      stackId: {
        allowNull: false,
        type: DataTypes.STRING
      },
      languageId: {
        allowNull: false,
        type: DataTypes.STRING
      },
    },
  );

  LanguageStack.associate = (models) => {
    LanguageStack.belongsTo(models.Language, {
      foreignKey: 'LanguageId',
      as: 'language'
    });
    LanguageStack.belongsTo(models.Stack, {
      foreignKey: 'StackId',
      as: 'stack'
    });
    LanguageStack.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };

  return LanguageStack;
};
