export default (sequelize, DataTypes) => {
  const Proficiency = sequelize.define('Proficiency', {
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    topicId: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    proficiency: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
  });

  Proficiency.associate = models => {
    Proficiency.belongsTo(models.User, {
      foreignKey: 'proficiencyId',
    });
    Proficiency.belongsTo(models.Topic, {
      foreignKey: 'proficiencyId',
    });
  };

  return Proficiency;
};
