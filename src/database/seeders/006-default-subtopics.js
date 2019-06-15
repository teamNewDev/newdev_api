module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'Subtopics',
      [
        {
          id: 11111,
          name: 'Declaring an array',
          topicId: '11111',
          createdAt: '2019-06-08 009:10:38.181+01',
          updatedAt: '2019-06-08 009:10:38.181+01',
        },
        {
          id: 22222,
          name: 'Splicing an array',
          topicId: '11111',
          createdAt: '2019-06-08 009:10:38.181+01',
          updatedAt: '2019-06-08 009:10:38.181+01',
        },
        {
          id: 33333,
          name: 'Spliting an array',
          topicId: '11111',
          createdAt: '2019-06-08 009:10:38.181+01',
          updatedAt: '2019-06-08 009:10:38.181+01',
        },
        {
          id: 44444,
          name: 'Delaring functions',
          topicId: '22222',
          createdAt: '2019-06-08 009:10:38.181+01',
          updatedAt: '2019-06-08 009:10:38.181+01',
        },
        {
          id: 55555,
          name: 'Calling functions',
          topicId: '22222',
          createdAt: '2019-06-08 009:10:38.181+01',
          updatedAt: '2019-06-08 009:10:38.181+01',
        },
      ],
      {},
    ),

  down: queryInterface => queryInterface.bulkDelete('Subtopics', null, {}),
};
