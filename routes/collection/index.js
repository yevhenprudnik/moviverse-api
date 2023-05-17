import * as Schemas from './schemas.js';
import { CollectionService } from '../../services/collection.service.js';

export default async fastify => {
  const service = new CollectionService();

  fastify.get(
    '/',
    { ...Schemas.getCollections, preHandler: fastify.useAccessAuth },
    async (request, reply) => {
      const keyword = request.query.keyword;

      const searchQuery = keyword
        ? { title: { $regex: keyword, $options: 'i' } }
        : {};

      return service.find(searchQuery, ['author', 'movies']);
    }
  );

  fastify.get(
    '/:id',
    // { ...Schemas.getCollection, preHandler: fastify.useAccessAuth },
    async (request, reply) => {
      return service.findById(request.params.id, ['author', 'movies']);
    }
  );

  fastify.post(
    '/',
    { ...Schemas.createCollection, preHandler: fastify.useAccessAuth },
    async (request, reply) => {
      return service.create({ ...request.body, author: request.user.id });
    }
  );

  fastify.patch(
    '/:id',
    { ...Schemas.updateCollection, preHandler: fastify.useAccessAuth },
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
    { ...Schemas.deleteCollection, preHandler: fastify.useAccessAuth },
    async (request, reply) => {
      const result = await service.delete({
        _id: request.params.id,
        author: request.user.id,
      });

      return result.deletedCount > 0 ? { deleted: true } : Error('Not found');
    }
  );
};
