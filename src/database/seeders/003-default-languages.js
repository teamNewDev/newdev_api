module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'Languages',
      [
        {
          id: 11111,
          name: 'javascript',
          createdAt: '2019-06-08 009:10:38.181+01',
          updatedAt: '2019-06-08 009:10:38.181+01',
        },
        {
          id: 22222,
          name: 'python',
          createdAt: '2019-06-08 009:10:38.181+01',
          updatedAt: '2019-06-08 009:10:38.181+01',
        },
      ],
      {},
    ),

  down: queryInterface => queryInterface.bulkDelete('Languages', null, {}),
};
