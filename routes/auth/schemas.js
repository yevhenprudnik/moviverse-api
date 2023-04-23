const typeString = { type: 'string' };

const user = {
  email: typeString,
  username: typeString,
};

const tokens = {
  accessToken: typeString,
  refreshToken: typeString,
};

export const login = {
  schema: {
    description: 'Returns user or throws an error for wrong credentials',
    body: {
      type: 'object',
      required: ['email', 'password'],
      properties: user,
    },
    response: {
      '2xx': {
        type: 'object',
        properties: tokens,
      },
    },
  },
};

export const register = {
  schema: {
    description: 'Returns user or throws an error for already used credentials',
    body: {
      type: 'object',
      required: ['email', 'password', 'username'],
      properties: user,
    },
    response: {
      '2xx': {
        type: 'object',
        properties: tokens,
      },
    },
  },
};
