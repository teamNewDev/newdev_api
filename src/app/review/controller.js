import models from '../../database/models';

const { Review } = models;

const createReview = async (req, res) => {
  const { resourceId, review } = req.body;
  const userId = req.decoded.id;
  const userReview = await Review.create({
    userId: userId.trim(),
    resourceId: resourceId.toLowerCase().trim(),
    review: review.toLowerCase().trim(),
  });
  return res.status(201).json({
    message: 'Sucessfully added Review!',
    review: userReview,
  });
};

const getReviews = async (req, res) => {
  const { resourceId } = req.params;
  const reviews = await Review.findAndCountAll({
    where: { resourceId },
    order: [['createdAt', 'DESC']],
  });

  return res.status(200).json({
    reviews: reviews.rows,
    count: reviews.count,
  });
};

export { createReview, getReviews };
