import Sequelize from 'sequelize';
import models from '../../database/models';

const { iLike } = Sequelize.Op;
const { Resource } = models;

const createResource = async (req, res) => {
  const { topicId, url, resourceType, title, author } = req.body;
  const resource = await Resource.create({
    topicId: topicId.trim(),
    url: url.toLowerCase().trim(),
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
  const { topicId } = req.params;
  const resources = await Resource.findAndCountAll({
    where: { topicId, disabled: false },
    order: [['createdAt', 'DESC']],
  });

  return res.status(200).json({
    resources: resources.rows,
    count: resources.count,
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
