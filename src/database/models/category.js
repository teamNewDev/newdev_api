import shortid from 'shortid';

export default (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: shortid.generate(),
    },
    name: {
      allowNull: false,
      primaryKey: true,
      unique: true,
      type: DataTypes.STRING,
    },
  });

  Category.associate = models => {
    Category.hasMany(models.Technology, {
      foreignKey: 'category',
    });
  };

  return Category;
};
