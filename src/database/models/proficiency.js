export default (sequelize, DataTypes) => {
  const Proficiency = sequelize.define(
    'Proficiency',
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
      topicId: {
        allowNull: false,
        type: DataTypes.UUID
      },
      proficiency: {
        allowNull: false,
        type: DataTypes.FLOAT,
      }
    },
  );

  Proficiency.associate = (models) => {
    Proficiency.belongsTo(models.User, {
      foreignKey: 'proficiencyId'
    });
    Proficiency.belongsTo(models.Topic, {
      foreignKey: 'proficiencyId'
    });
  };

  return Proficiency;
};
