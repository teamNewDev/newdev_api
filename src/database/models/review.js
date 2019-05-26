export default (sequelize, DataTypes) => {
  const Review = sequelize.define(
    'Review',
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
      review: {
        allowNull: false,
        type: DataTypes.TEXT
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
