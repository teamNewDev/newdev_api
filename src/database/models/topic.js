import shortid from 'shortid';

export default (sequelize, DataTypes) => {
  const Topic = sequelize.define('Topic', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: shortid.generate(),
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    technologyId: {
      type: DataTypes.STRING,
    },
  });

  Topic.associate = models => {
    Topic.belongsTo(models.Technology, {
      foreignKey: 'topicId',
    });
    Topic.belongsTo(models.Proficiency, {
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
