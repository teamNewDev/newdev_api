export default (sequelize, DataTypes) => {
  const Language = sequelize.define('Language', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });

  Language.associate = models => {
    Language.belongsToMany(models.Stack, {
      through: 'LanguageStack',
      foreignKey: 'languageId',
    });
    Language.hasMany(models.Topic, {
      foreignKey: 'id',
    });
  };

  return Language;
};
