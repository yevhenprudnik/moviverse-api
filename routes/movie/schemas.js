const typeString = {
  type: 'string',
};

const typeInteger = {
  type: 'integer',
};

export const movie = {
  _id: typeString,
  title: typeString,
  subtitle: typeString,
  genre: {
    type: 'array',
    items: typeString,
  },
  year: typeInteger,
  director: typeString,
  runtime: typeInteger,
  image: typeString,
  trailer: typeString,
  synopsis: typeString,
};

export const getMovie = {
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
        properties: movie,
      },
    },
  },
};

export const getMovies = {
  schema: {
    response: {
      '2xx': {
        type: 'array',
        items: {
          type: 'object',
          properties: movie,
        },
      },
    },
  },
};

export const createMovie = {
  schema: {
    body: {
      type: 'object',
      required: ['title', 'genre', 'year'],
      properties: movie,
    },
    response: {
      '2xx': {
        type: 'object',
        properties: movie,
      },
    },
  },
};

export const updateMovie = {
  schema: {
    body: {
      type: 'object',
      properties: movie,
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
        properties: movie,
      },
    },
  },
};

export const deleteMovie = {
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
