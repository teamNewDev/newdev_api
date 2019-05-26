export default (sequelize, DataTypes) => {
  const AverageRating = sequelize.define(
    'AverageRating',
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      resourceId: {
        allowNull: false,
        type: DataTypes.UUID
      },
      averageRating: {
        allowNull: false,
        type: DataTypes.FLOAT,
      }
    },
  );

  AverageRating.associate = (models) => {
    AverageRating.belongsTo(models.Resource, {
      foreignKey: 'averageRating'
    });
  };

  return AverageRating;
};
