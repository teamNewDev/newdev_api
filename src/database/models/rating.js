export default (sequelize, DataTypes) => {
  const Rating = sequelize.define(
    'Rating',
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      userId: {
        allowNull: false,
        type: DataTypes.UUID
      },
      resourceId: {
        allowNull: false,
        type: DataTypes.UUID
      },
      rating: {
        allowNull: false,
        type: DataTypes.FLOAT,
      }
    },
  );

  Rating.associate = (models) => {
    Rating.belongsTo(models.User, {
      foreignKey: 'ratingId'
    });
    Rating.belongsTo(models.Resource, {
      foreignKey: 'ratingId'
    });
    Rating.belongsTo(models.AverageRating, {
      foreignKey: 'ratingId'
    });
  };

  return Rating;
};
