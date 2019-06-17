module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'Reviews',
      [
        {
          id: 11111,
          userId: 55555,
          resourceId: 44444,
          review: 'Awesome article! Explained everything very well.',
          createdAt: '2019-06-08 009:10:38.181+01',
          updatedAt: '2019-06-08 009:10:38.181+01',
        },
        {
          id: 22222,
          userId: 44444,
          resourceId: 11111,
          review: 'This video was terrible! I couldnt understand the speaker!',
          createdAt: '2019-06-08 009:10:38.181+01',
          updatedAt: '2019-06-08 009:10:38.181+01',
        },
        {
          id: 33333,
          userId: 55555,
          resourceId: 22222,
          review: 'Great article! I understand HTTP requests much better now!',
          createdAt: '2019-06-08 009:10:38.181+01',
          updatedAt: '2019-06-08 009:10:38.181+01',
        },
        {
          id: 44444,
          userId: 33333,
          resourceId: 55555,
          review: 'The creator did not explain things very well.',
          createdAt: '2019-06-08 009:10:38.181+01',
          updatedAt: '2019-06-08 009:10:38.181+01',
        },
        {
          id: 55555,
          userId: 11111,
          resourceId: 33333,
          review: 'Great video! I am looking forward to trying these methods!',
          createdAt: '2019-06-08 009:10:38.181+01',
          updatedAt: '2019-06-08 009:10:38.181+01',
        },
      ],
      {},
    ),

  down: queryInterface => queryInterface.bulkDelete('Reviews', null, {}),
};
