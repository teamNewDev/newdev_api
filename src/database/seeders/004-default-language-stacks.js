module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'LanguageStacks',
      [
        {
          id: 11111,
          languageId: 11111,
          stackId: 11111,
          createdAt: '2019-06-08 009:10:38.181+01',
          updatedAt: '2019-06-08 009:10:38.181+01',
        },
        {
          id: 22222,
          languageId: 11111,
          stackId: 22222,
          createdAt: '2019-06-08 009:10:38.181+01',
          updatedAt: '2019-06-08 009:10:38.181+01',
        },
        {
          id: 33333,
          languageId: 22222,
          stackId: 22222,
          createdAt: '2019-06-08 009:10:38.181+01',
          updatedAt: '2019-06-08 009:10:38.181+01',
        },
      ],
      {},
    ),

  down: queryInterface => queryInterface.bulkDelete('LanguageStacks', null, {}),
};
