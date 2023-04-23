import { movie } from '../movie/schemas.js';

const typeString = {
  type: 'string',
};

const author = {
  _id: typeString,
  username: typeString,
};

export const collection = {
  _id: typeString,
  title: typeString,
};

export const getCollection = {
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
        properties: {
          ...collection,
          author: {
            type: 'object',
            properties: author,
          },
          movies: {
            type: 'array',
            items: {
              type: 'object',
              properties: movie,
            },
          },
        },
      },
    },
  },
};

export const getCollections = {
  schema: {
    response: {
      '2xx': {
        type: 'array',
        items: {
          type: 'object',
          properties: collection,
        },
      },
    },
  },
};

export const createCollection = {
  schema: {
    body: {
      type: 'object',
      required: ['title'],
      properties: collection,
    },
    response: {
      '2xx': {
        type: 'object',
        properties: collection,
      },
    },
  },
};

export const updateCollection = {
  schema: {
    body: {
      type: 'object',
      properties: collection,
    },
    params: {
      type: 'object',
      properties: {
        id: typeString,
      },
    },
    response: {
      '2xx': {
        type: 'object',
        properties: collection,
      },
    },
  },
};

export const deleteCollection = {
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
        properties: {
          deleted: {
            type: 'boolean',
          },
        },
      },
    },
  },
};
