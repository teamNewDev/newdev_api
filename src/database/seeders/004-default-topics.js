module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'Topics',
      [
        {
          id: '11111',
          name: 'JavaScript Arrays',
          technology: 'javascript',
          createdAt: '2019-06-08 009:10:38.181+01',
          updatedAt: '2019-06-08 009:10:38.181+01',
        },
        {
          id: '22222',
          name: 'Python Functions',
          technology: 'python',
          createdAt: '2019-06-08 009:10:38.181+01',
          updatedAt: '2019-06-08 009:10:38.181+01',
        },
        {
          id: '33333',
          name: 'HTML Forms',
          technology: 'html',
          createdAt: '2019-06-08 009:10:38.181+01',
          updatedAt: '2019-06-08 009:10:38.181+01',
        },
        {
          id: '44444',
          name: 'JavaScript Objects',
          technology: 'javascript',
          createdAt: '2019-06-08 009:10:38.181+01',
          updatedAt: '2019-06-08 009:10:38.181+01',
        },
      ],
      {},
    ),

  down: queryInterface => queryInterface.bulkDelete('Topics', null, {}),
};
