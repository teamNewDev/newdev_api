module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'Technologies',
      [
        {
          id: 11111,
          name: 'javascript',
          category: 'frontend',
          index: '1.0',
          createdAt: '2019-06-08 009:10:38.181+01',
          updatedAt: '2019-06-08 009:10:38.181+01',
        },
        {
          id: 22222,
          name: 'nodejs',
          category: 'backend',
          index: '2.0',
          createdAt: '2019-06-08 009:10:38.181+01',
          updatedAt: '2019-06-08 009:10:38.181+01',
        },
        {
          id: 33333,
          name: 'html',
          category: 'markup',
          index: '3.0',
          createdAt: '2019-06-08 009:10:38.181+01',
          updatedAt: '2019-06-08 009:10:38.181+01',
        },
        {
          id: 44444,
          name: 'python',
          category: 'backend',
          index: '4.0',
          createdAt: '2019-06-08 009:10:38.181+01',
          updatedAt: '2019-06-08 009:10:38.181+01',
        },
      ],
      {},
    ),

  down: queryInterface => queryInterface.bulkDelete('Technologies', null, {}),
};
