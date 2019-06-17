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
    disabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  Resource.associate = models => {
    Resource.belongsTo(models.Topic, {
      foreignKey: 'topicId',
    });
    Resource.hasOne(models.AverageRating, {
      foreignKey: 'resourceId',
    });
    Resource.hasMany(models.Rating, {
      foreignKey: 'id',
      onDelete: 'CASCADE',
    });
    Resource.hasMany(models.Review, {
      foreignKey: 'resourceId',
      onDelete: 'CASCADE',
    });
  };

  return Resource;
};
