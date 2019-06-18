import models from '../../database/models';

const { Rating, AverageRating } = models;

const createRating = async (req, res) => {
  const { resourceId, rating } = req.body;
  const userId = req.decoded.id;
  const userRating = await Rating.create({
    userId: userId.trim(),
    resourceId: resourceId.toLowerCase().trim(),
    rating,
  });
  const resourceRatings = await Rating.findAndCountAll({
    where: { resourceId },
  });
  const newResourceRateCount = resourceRatings.count;
  const oldResourceRateCount = newResourceRateCount - 1;
  const averageRating = await AverageRating.findOne({
    where: { resourceId },
  });
  const averageRateValue = averageRating
    ? averageRating.dataValues.averageRating
    : null;
  const newAverageRating = averageRateValue
    ? await averageRating.update({
        averageRating:
          (averageRateValue * oldResourceRateCount + parseInt(rating, 10)) /
          newResourceRateCount,
      })
    : await AverageRating.create({
        resourceId: resourceId.trim(),
        averageRating: rating,
      });
  return res.status(201).json({
    message: 'Sucessfully added Rating!',
    rating: userRating,
    averageRating: newAverageRating.averageRating,
  });
};

const getAverageRating = async (req, res) => {
  const { resourceId } = req.params;
  const averageRating = await AverageRating.findOne({
    where: { resourceId },
  });

  return res.status(200).json({
    averageRating,
  });
};

export { createRating, getAverageRating };
