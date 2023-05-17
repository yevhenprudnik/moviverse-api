import * as Schemas from './schemas.js';
import { MovieService } from '../../services/movie.service.js';

export default async fastify => {
  const service = new MovieService();

  fastify.get(
    '/',
    { ...Schemas.getMovies, preHandler: fastify.useAccessAuth },
    async (request, reply) => {
      const keyword = request.query.keyword;

      const searchQuery = keyword.length
        ? { title: { $regex: keyword, $options: 'i' } }
        : {};

      return service.find(searchQuery);
    }
  );

  fastify.get(
    '/:id',
    { ...Schemas.getMovie, preHandler: fastify.useAccessAuth },
    async (request, reply) => {
      return service.findById(request.params.id);
    }
  );

  fastify.post(
    '/',
    { ...Schemas.createMovie, preHandler: fastify.useAccessAuth },
    async (request, reply) => {
      return service.create(request.body);
    }
  );

  fastify.patch(
    '/:id',
    { ...Schemas.updateMovie, preHandler: fastify.useAccessAuth },
    async (request, reply) => {
      const result = await service.update(
        { _id: request.params.id, author: request.user.id },
        request.body
      );

      return result || Error('Not found');
    }
  );

  fastify.delete(
    '/:id',
    { ...Schemas.deleteMovie, preHandler: fastify.useAccessAuth },
    async (request, reply) => {
      const result = await service.delete({
        _id: request.params.id,
        author: request.user.id,
      });

      return result.deletedCount > 0 ? { deleted: true } : Error('Not found');
    }
  );
};
