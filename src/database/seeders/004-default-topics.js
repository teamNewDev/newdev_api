module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'Topics',
      [
        {
          id: '097d653a-7881-4b41-a47d-7b98cca7af00',
          name: 'JavaScript Arrays',
          technology: 'javascript',
          createdAt: '2019-06-08 009:10:38.181+01',
          updatedAt: '2019-06-08 009:10:38.181+01',
        },
        {
          id: '4a7b9957-f27a-4ade-a039-d9d071739b75',
          name: 'Python Functions',
          technology: 'python',
          createdAt: '2019-06-08 009:10:38.181+01',
          updatedAt: '2019-06-08 009:10:38.181+01',
        },
        {
          id: 'da7b8d19-e70c-4f97-aa16-561d7b55338a',
          name: 'HTML Forms',
          technology: 'html',
          createdAt: '2019-06-08 009:10:38.181+01',
          updatedAt: '2019-06-08 009:10:38.181+01',
        },
        {
          id: '77fb59b4-3864-49f5-8c2b-ce0259372888',
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
