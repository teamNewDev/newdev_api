import shortid from 'shortid';

export default (sequelize, DataTypes) => {
  const Stack = sequelize.define('Stack', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: shortid.generate(),
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });

  Stack.associate = models => {
    Stack.belongsToMany(models.Language, {
      through: 'LanguageStack',
      foreignKey: 'stackId',
    });
  };

  return Stack;
};
