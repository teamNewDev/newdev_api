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
    subtopicIds: {
      allowNull: true,
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    proficiency: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
  });

  Proficiency.associate = models => {
    Proficiency.belongsTo(models.User, {
      foreignKey: 'userId',
    });
    Proficiency.belongsTo(models.Topic, {
      foreignKey: 'topicId',
    });
  };

  return Proficiency;
};
