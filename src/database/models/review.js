export default (sequelize, DataTypes) => {
  const Review = sequelize.define(
    'Review',
    {
      id: {
        primaryKey: true,
        type: DataTypes.STRING
      },
      userId: {
        allowNull: false,
        type: DataTypes.STRING
      },
      resourceId: {
        allowNull: false,
        type: DataTypes.STRING
      },
      review: {
        allowNull: false,
        type: DataTypes.TEXT,
      }
    },
  );

  Review.associate = (models) => {
    Review.belongsTo(models.User, {
      foreignKey: 'proficiencyId'
    });
    Review.belongsTo(models.Resource, {
      foreignKey: 'proficiencyId'
    });
  };

  return Review;
};
