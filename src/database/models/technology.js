export default (sequelize, DataTypes) => {
  const Technology = sequelize.define('Technology', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    category: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });

  Technology.associate = models => {
    Technology.belongsTo(models.Category, {
      foreignKey: 'category',
    });
  };

  return Technology;
};
