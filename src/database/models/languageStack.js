export default (sequelize, DataTypes) => {
  const LanguageStack = sequelize.define('LanguageStack', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
    },
    stackId: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    languageId: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });

  return LanguageStack;
};
