export default (sequelize, DataTypes) => {
  const Topic = sequelize.define('Topic', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    technology: {
      type: DataTypes.STRING,
    },
  });

  Topic.associate = models => {
    Topic.belongsTo(models.Technology, {
      foreignKey: 'technology',
    });
    Topic.hasMany(models.Proficiency, {
      foreignKey: 'topicId',
    });
    Topic.hasMany(models.Resource, {
      foreignKey: 'topicId',
    });
    Topic.hasMany(models.Subtopic, {
      foreignKey: 'topicId',
    });
  };

  return Topic;
};
