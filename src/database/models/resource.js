export default (sequelize, DataTypes) => {
  const Resource = sequelize.define('Resource', {
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
    },
    topicId: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    url: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    resourceType: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    author: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });

  Resource.associate = models => {
    Resource.belongsTo(models.Topic, {
      foreignKey: 'id',
    });
    Resource.belongsTo(models.AverageRating, {
      foreignKey: 'id',
    });
    Resource.hasMany(models.Rating, {
      foreignKey: 'id',
      onDelete: 'CASCADE',
    });
    Resource.hasMany(models.Review, {
      foreignKey: 'id',
      onDelete: 'CASCADE',
    });
  };

  return Resource;
};
