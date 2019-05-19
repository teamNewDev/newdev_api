import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const Stack = sequelize.define(
    'Stack',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
    },
  );

  Stack.associate = (models) => {
    Stack.belongsTo(models.LanguageStack, {
      foreignKey: 'stackId',
      as: 'languageStacks'
    });
  };

  return Stack;
};
