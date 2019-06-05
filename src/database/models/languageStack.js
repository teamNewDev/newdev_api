export default (sequelize, DataTypes) => {
  const LanguageStack = sequelize.define('LanguageStack', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    stackId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    languageId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
  });

  LanguageStack.associate = models => {
    LanguageStack.hasMany(models.Language, {
      foreignKey: 'LanguageStackId',
    });
    LanguageStack.hasMany(models.Stack, {
      foreignKey: 'LanguageStackId',
    });
    LanguageStack.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return LanguageStack;
};
