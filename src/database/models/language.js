import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const Language = sequelize.define(
    'Language',
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
  };

  return Language;
};
