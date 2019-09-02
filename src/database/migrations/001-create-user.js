module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        defaultValue: Sequelize.UUIDV4,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
      },
      firstName: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      lastName: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: true,
        type: Sequelize.STRING,
        unique: true,
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: 'user',
      },
      // verificationToken: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      //   defaultValue: false,
      // },
      // active: {
      //   type: Sequelize.BOOLEAN,
      //   allowNull: false,
      //   defaultValue: false,
      // },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: queryInterface => queryInterface.dropTable('Users'),
};
