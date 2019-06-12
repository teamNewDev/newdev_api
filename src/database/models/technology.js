export default (sequelize, DataTypes) => {
  const Technology = sequelize.define('Technology', {
    id: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      allowNull: false,
      primaryKey: true,
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
    Technology.hasMany(models.Topic, {
      foreignKey: 'technology',
    });
  };

  return Technology;
};
