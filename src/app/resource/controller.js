import Sequelize from 'sequelize';
import models from '../../database/models';

const { iLike } = Sequelize.Op;
const { Resource, AverageRating, Topic } = models;

const createResource = async (req, res) => {
  const { topicId, url, resourceType, title, author } = req.body;
  const resource = await Resource.create({
    topicId: topicId.trim(),
    url: url.trim(),
    resourceType: resourceType.toLowerCase().trim(),
    title: title.toLowerCase().trim(),
    author: author.toLowerCase().trim(),
  });
  return res.status(201).json({
    message: 'Sucessfully added Resource!',
    resource,
  });
};

const getResources = async (req, res) => {
  const {
    params: { topicId },
  } = req;
  let offset,
    { page, limit = 100 } = req.query;
  page = Number(page);

  offset = limit * (page - 1);
  /* istanbul ignore next */
  if (!page || page < 1 || !Number(limit)) {
    offset = 0;
    page = 1;
    limit = 100;
  }

  const resources = await Resource.findAndCountAll({
    where: { topicId, disabled: false },
    limit,
    offset,
    include: [
      {
        model: AverageRating,
        attributes: ['averageRating'],
      },
      {
        model: Topic,
        attributes: ['name'],
      },
    ],
    order: [['createdAt', 'DESC']],
    distinct: true,
  });

  return res.status(200).json({
    resources: resources.rows,
    count: resources.rows.length,
    totalCount: resources.count,
    page,
  });
};

const editResource = async (req, res) => {
  const {
    params: { resourceId: id },
    body: { resourceType, title, author },
  } = req;
  const resource = await Resource.findOne({
    where: {
      id: { [iLike]: id },
    },
  });
  await resource.update({
    resourceType:
      (resourceType && resourceType.toLowerCase().trim()) ||
      resource.dataValues.resourceType,
    title: (title && title.toLowerCase().trim()) || resource.dataValues.title,
    author:
      (author && author.toLowerCase().trim()) || resource.dataValues.author,
  });
  return res.status(200).json({
    message: 'Resource updated successfully!',
    resource,
  });
};

const deleteResource = async (req, res) => {
  const { resourceId: id } = req.params;
  const resource = await Resource.findOne({
    where: {
      id: { [iLike]: id },
    },
  });
  await resource.update({ disabled: true });
  return res.status(200).json({
    message: 'Resource deleted successfully!',
  });
};

export { createResource, getResources, editResource, deleteResource };
