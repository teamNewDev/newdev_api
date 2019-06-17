export default (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    resourceId: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    review: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
  });

  Review.associate = models => {
    Review.belongsTo(models.User, {
      foreignKey: 'userId',
    });
    Review.belongsTo(models.Resource, {
      foreignKey: 'resourceId',
    });
  };

  return Review;
};
