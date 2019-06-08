module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'Stacks',
      [
        {
          id: 11111,
          name: 'frontend',
          createdAt: '2019-06-08 009:10:38.181+01',
          updatedAt: '2019-06-08 009:10:38.181+01',
        },
        {
          id: 22222,
          name: 'backend',
          createdAt: '2019-06-08 009:10:38.181+01',
          updatedAt: '2019-06-08 009:10:38.181+01',
        },
      ],
      {},
    ),

  down: queryInterface => queryInterface.bulkDelete('Stacks', null, {}),
};
