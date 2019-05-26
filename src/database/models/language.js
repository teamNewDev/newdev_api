export default (sequelize, DataTypes) => {
  const Language = sequelize.define(
    'Language',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      version: {
        allowNull: false,
        type: DataTypes.STRING
      },
    },
  );

  Language.associate = (models) => {
    Language.belongsTo(models.LanguageStack, {
      foreignKey: 'languageId',
      as: 'languageStacks'
    });
    Language.hasMany(models.Topic, {
      foreignKey: 'languageId',
      as: 'topics'
    });
  };

  return Language;
};
