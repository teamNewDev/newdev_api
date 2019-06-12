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
    technology: {
      type: DataTypes.STRING,
    },
  });

  Topic.associate = models => {
    Topic.belongsTo(models.Technology, {
      foreignKey: 'technology',
    });
    Topic.belongsTo(models.Proficiency, {
      foreignKey: 'id',
    });
    Topic.hasMany(models.Resource, {
      foreignKey: 'id',
    });
    Topic.hasMany(models.Subtopic, {
      foreignKey: 'id',
    });
  };

  return Topic;
};
