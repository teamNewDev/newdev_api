require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: 'postgres',
    operatorsAliases: false
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
    operatorsAliases: false
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    operatorsAliases: false
  }
};
