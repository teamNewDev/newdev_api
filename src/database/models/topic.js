import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const Topic = sequelize.define(
    'Topic',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      languageId: {
        type: DataTypes.STRING
      }
    },
  );

  Topic.associate = (models) => {
    Topic.belongsTo(models.Language, {
      foreignKey: 'topicId',
      as: 'topics'
    });
    Topic.belongsTo(models.Proficiency, {
      foreignKey: 'topicId'
    });
    Topic.hasMany(models.Resource, {
      foreignKey: 'topicId'
    });
    Topic.hasMany(models.Subtopic, {
      foreignKey: 'topicId'
    });
  };

  return Topic;
};
