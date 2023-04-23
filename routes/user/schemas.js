import { collection } from '../collection/schemas.js';

const typeString = {
  type: 'string',
};

export const user = {
  _id: typeString,
  username: typeString,
  email: typeString,
  collections: {
    type: 'array',
    items: {
      type: 'object',
      properties: collection,
    },
  },
};

export const getUser = {
  schema: {
    params: {
      type: 'object',
      properties: {
        id: typeString,
      },
    },
    response: {
      '2xx': {
        type: 'object',
        properties: user,
      },
    },
  },
};

export const getUsers = {
  schema: {
    response: {
      '2xx': {
        type: 'array',
        items: {
          type: 'object',
          properties: user,
        },
      },
    },
  },
};

export const updateUser = {
  schema: {
    body: {
      type: 'object',
      properties: user,
    },
    response: {
      '2xx': {
        type: 'object',
        properties: user,
      },
    },
  },
};

export const deleteUser = {
  schema: {
    response: {
      '2xx': {
        type: 'object',
        properties: {
          deleted: {
            type: 'boolean',
          },
        },
      },
    },
  },
};
