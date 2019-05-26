export default (sequelize, DataTypes) => {
  const Resource = sequelize.define(
    'Resource',
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      topicId: {
        allowNull: false,
        type: DataTypes.UUID
      },
      url: {
        allowNull: false,
        type: DataTypes.STRING
      },
      resourceType: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      review: {
        allowNull: true,
        type: DataTypes.TEXT
      }
    },
  );

  Resource.associate = (models) => {
    Resource.belongsTo(models.Topic, {
      foreignKey: 'resourceId'
    });
    Resource.belongsTo(models.AverageRating, {
      foreignKey: 'resourceId'
    });
    Resource.hasMany(models.Rating, {
      foreignKey: 'resourceId',
      onDelete: 'CASCADE'
    });
    Resource.hasMany(models.Review, {
      foreignKey: 'resourceId',
      onDelete: 'CASCADE'
    });
  };

  return Resource;
};
