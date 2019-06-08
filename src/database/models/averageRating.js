export default (sequelize, DataTypes) => {
  const AverageRating = sequelize.define('AverageRating', {
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
    },
    resourceId: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    averageRating: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
  });

  AverageRating.associate = models => {
    AverageRating.belongsTo(models.Resource, {
      foreignKey: 'averageRatingId',
    });
  };

  return AverageRating;
};
