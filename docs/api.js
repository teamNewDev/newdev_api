export default {
  swagger: '2.0',
  info: {
    version: '1.0',
    title: 'NewDev API Docs',
    description: 'NewDev Api Documentation',
    contact: {},
  },
  host: process.env.BASE_url,
  basePath: '/api/v1',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  paths: {
    '/users/auth/signup': {
      post: {
        description: 'Signup a user',
        summary: 'User signup',
        tags: ['Users'],
        operationId: 'UsersAuthSignupPost',
        deprecated: false,
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'username',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'password',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'email',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'firstName',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
        ],
        responses: {
          '200': {
            description: '',
            headers: {},
          },
        },
      },
    },
    '/users/auth/login': {
      post: {
        description: 'Login a user.',
        summary: 'Login user',
        tags: ['Users'],
        operationId: 'UsersAuthLoginPost',
        deprecated: false,
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'usernameOrEmail',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'password',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
        ],
        responses: {
          '200': {
            description: '',
            headers: {},
          },
        },
      },
    },
    '/users/role': {
      patch: {
        description: "Update a user's role.",
        summary: 'Update user role',
        tags: ['Users'],
        operationId: 'UsersRolePatch',
        deprecated: false,
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'userId',
            in: 'formData',
            required: true,
            type: 'integer',
            format: 'int32',
            description: '',
          },
          {
            name: 'role',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
        ],
        responses: {
          '200': {
            description: '',
            headers: {},
          },
        },
        security: [],
      },
    },
    '/users/update': {
      patch: {
        description: "Update a user's firstName or lastName.",
        summary: 'Update user',
        tags: ['Users'],
        operationId: 'UsersUpdatePatch',
        deprecated: false,
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'lastName',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
        ],
        responses: {
          '200': {
            description: '',
            headers: {},
          },
        },
        security: [],
      },
    },
    '/categories': {
      get: {
        description: 'Get all categories.',
        summary: 'Get all categories',
        tags: ['Categories'],
        operationId: 'CategoriesGet',
        deprecated: false,
        produces: ['application/json'],
        parameters: [],
        responses: {
          '200': {
            description: '',
            headers: {},
          },
        },
      },
      post: {
        description: 'Create a category.',
        summary: 'Create category',
        tags: ['Categories'],
        operationId: 'CategoriesPost',
        deprecated: false,
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'name',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
        ],
        responses: {
          '200': {
            description: '',
            headers: {},
          },
        },
        security: [],
      },
    },
    '/categories/frontend': {
      get: {
        description: 'Get a single category.',
        summary: 'Get single category',
        tags: ['Categories'],
        operationId: 'CategoriesFrontendGet',
        deprecated: false,
        produces: ['application/json'],
        parameters: [],
        responses: {
          '200': {
            description: '',
            headers: {},
          },
        },
      },
    },
    '/technologies': {
      get: {
        description: 'Get all technologies.',
        summary: 'Get all technologies',
        tags: ['Technologies'],
        operationId: 'TechnologiesGet',
        deprecated: false,
        produces: ['application/json'],
        parameters: [],
        responses: {
          '200': {
            description: '',
            headers: {},
          },
        },
      },
      post: {
        description: 'Add a technology.',
        summary: 'Add technology',
        tags: ['Technologies'],
        operationId: 'TechnologiesPost',
        deprecated: false,
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'name',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'category',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'index',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
        ],
        responses: {
          '200': {
            description: '',
            headers: {},
          },
        },
        security: [],
      },
    },
    '/technologies/javascript': {
      get: {
        description: 'Get a single technology.',
        summary: 'Get technology',
        tags: ['Technologies'],
        operationId: 'TechnologiesJavascriptGet',
        deprecated: false,
        produces: ['application/json'],
        parameters: [],
        responses: {
          '200': {
            description: '',
            headers: {},
          },
        },
      },
    },
    '/topics': {
      post: {
        description: 'Add a topic.',
        summary: 'Add topic',
        tags: ['Topics'],
        operationId: 'TopicsPost',
        deprecated: false,
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'name',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'technology',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
        ],
        responses: {
          '200': {
            description: '',
            headers: {},
          },
        },
        security: [],
      },
    },
    '/topics/python': {
      get: {
        description: 'Get topics from a specific technology.',
        summary: 'Get topics',
        tags: ['Topics'],
        operationId: 'TopicsPythonGet',
        deprecated: false,
        produces: ['application/json'],
        parameters: [],
        responses: {
          '200': {
            description: '',
            headers: {},
          },
        },
      },
    },
    '/subtopics': {
      post: {
        description: 'Add a subtopic to a specified topic.',
        summary: 'Add subtopic',
        tags: ['Subtopics'],
        operationId: 'SubtopicsPost',
        deprecated: false,
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'name',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'topicId',
            in: 'formData',
            required: true,
            type: 'integer',
            format: 'int32',
            description: '',
          },
        ],
        responses: {
          '200': {
            description: '',
            headers: {},
          },
        },
        security: [],
      },
    },
    '/subtopics/22222': {
      get: {
        description: 'Get subtopics for a specific topic.',
        summary: 'Get subtopics',
        tags: ['Subtopics'],
        operationId: 'Subtopics22222Get',
        deprecated: false,
        produces: ['application/json'],
        parameters: [],
        responses: {
          '200': {
            description: '',
            headers: {},
          },
        },
      },
    },
    '/subtopics/44444': {
      patch: {
        description: 'Update name of specified subtopic.',
        summary: 'Update subtopic',
        tags: ['Subtopics'],
        operationId: 'Subtopics44444Patch',
        deprecated: false,
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'name',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
        ],
        responses: {
          '200': {
            description: '',
            headers: {},
          },
        },
        security: [],
      },
    },
    '/subtopics/55555': {
      delete: {
        description: 'Delete a subtopic.',
        summary: 'Delete subtopic',
        tags: ['Subtopics'],
        operationId: 'Subtopics55555Delete',
        deprecated: false,
        produces: ['application/json'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description: '',
          },
        ],
        responses: {
          '200': {
            description: '',
            headers: {},
          },
        },
        security: [],
      },
    },
    '/resources/11111': {
      get: {
        description: 'Get resources for a specific topic.',
        summary: 'Get resources',
        tags: ['Resources'],
        operationId: 'Resources11111Get',
        deprecated: false,
        produces: ['application/json'],
        parameters: [],
        responses: {
          '200': {
            description: '',
            headers: {},
          },
        },
      },
      patch: {
        description: 'Edit a resource.',
        summary: 'Edit resource',
        tags: ['Resources'],
        operationId: 'Resources11111Patch',
        deprecated: false,
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'author',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
        ],
        responses: {
          '200': {
            description: '',
            headers: {},
          },
        },
        security: [],
      },
      delete: {
        description: 'Delete a resource.',
        summary: 'Delete resource',
        tags: ['Resources'],
        operationId: 'Resources11111Delete',
        deprecated: false,
        produces: ['application/json'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description: '',
          },
        ],
        responses: {
          '200': {
            description: '',
            headers: {},
          },
        },
        security: [],
      },
    },
    '/resources': {
      post: {
        description: 'Add a resource.',
        summary: 'Add resource',
        tags: ['Resources'],
        operationId: 'ResourcesPost',
        deprecated: false,
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'topicId',
            in: 'formData',
            required: true,
            type: 'integer',
            format: 'int32',
            description: '',
          },
          {
            name: 'url',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'resourceType',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'title',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'author',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
        ],
        responses: {
          '200': {
            description: '',
            headers: {},
          },
        },
        security: [],
      },
    },
    '/reviews/11111': {
      get: {
        description: 'Get reviews for a specific resource.',
        summary: 'Get reviews',
        tags: ['Reviews'],
        operationId: 'Reviews11111Get',
        deprecated: false,
        produces: ['application/json'],
        parameters: [],
        responses: {
          '200': {
            description: '',
            headers: {},
          },
        },
      },
    },
    '/reviews': {
      post: {
        description: 'Add a review for a specific resource.',
        summary: 'Add review',
        tags: ['Reviews'],
        operationId: 'ReviewsPost',
        deprecated: false,
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'resourceId',
            in: 'formData',
            required: true,
            type: 'integer',
            format: 'int32',
            description: '',
          },
          {
            name: 'review',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
        ],
        responses: {
          '200': {
            description: '',
            headers: {},
          },
        },
        security: [],
      },
    },
    '/ratings': {
      post: {
        description: 'Add rating to a resource.',
        summary: 'Add rating',
        tags: ['Ratings'],
        operationId: 'RatingsPost',
        deprecated: false,
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'rating',
            in: 'formData',
            required: true,
            type: 'integer',
            format: 'int32',
            description: '',
          },
          {
            name: 'resourceId',
            in: 'formData',
            required: true,
            type: 'integer',
            format: 'int32',
            description: '',
          },
        ],
        responses: {
          '200': {
            description: '',
            headers: {},
          },
        },
        security: [],
      },
    },
    '/ratings/44444': {
      get: {
        description: 'Get the average rating for a resource.',
        summary: 'Get average rating',
        tags: ['Ratings'],
        operationId: 'Ratings44444Get',
        deprecated: false,
        produces: ['application/json'],
        parameters: [],
        responses: {
          '200': {
            description: '',
            headers: {},
          },
        },
      },
    },
    '/proficiencies/topic': {
      post: {
        description: 'Mark a topic as completed.',
        summary: 'Mark topic as completed',
        tags: ['Proficiencies'],
        operationId: 'ProficienciesTopicPost',
        deprecated: false,
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'topicId',
            in: 'formData',
            required: true,
            type: 'integer',
            format: 'int32',
            description: '',
          },
        ],
        responses: {
          '200': {
            description: '',
            headers: {},
          },
        },
        security: [],
      },
    },
    '/proficiencies/subtopic': {
      post: {
        description: 'Mark a suptopic as completed.',
        summary: 'Mark subtopic as completed',
        tags: ['Proficiencies'],
        operationId: 'ProficienciesSubtopicPost',
        deprecated: false,
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'subtopicId',
            in: 'formData',
            required: true,
            type: 'integer',
            format: 'int32',
            description: '',
          },
        ],
        responses: {
          '200': {
            description: '',
            headers: {},
          },
        },
        security: [],
      },
    },
  },
  tags: [
    {
      name: 'Users',
    },
    {
      name: 'Categories',
    },
    {
      name: 'Technologies',
    },
    {
      name: 'Topics',
    },
    {
      name: 'Subtopics',
    },
    {
      name: 'Resources',
    },
    {
      name: 'Reviews',
    },
    {
      name: 'Ratings',
    },
    {
      name: 'Proficiencies',
    },
  ],
};
