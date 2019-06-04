export default {
  swagger: '2.0',
  info: {
    version: '1.0',
    title: 'NewDev Api Documentation',
    description: 'NewDev Api Documentation',
    contact: {},
  },
  host: 'newdev-api-staging.herokuapp.com',
  basePath: '/api/v1',
  schemes: ['https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  paths: {
    '/users': {
      post: {
        description: '',
        summary: 'Signup',
        operationId: 'UsersPost',
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
            name: 'firstname',
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
            name: 'password',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: '',
          },
        ],
        responses: {
          201: {
            description: '',
            schema: {
              $ref: '#/definitions/SignupResponse',
            },
            examples: {
              'application/json': {
                message: 'Registration successful!',
                username: 'newdev',
                email: 'newdevt@gmail.com',
                notification: [],
                token:
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNGFiNDlkE',
              },
            },
            headers: {},
          },
          500: {
            description: 'Server Error',
          },
        },
      },
    },
  },
};
