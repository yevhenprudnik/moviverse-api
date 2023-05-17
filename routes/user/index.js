import * as Schemas from './schemas.js';
import { UserService } from '../../services/user.service.js';

export default async fastify => {
  const service = new UserService();

  fastify.get(
    '/',
    { ...Schemas.getUsers, preHandler: fastify.useAccessAuth },
    async (request, reply) => {
      const keyword = request.query.keyword;

      const searchQuery = keyword
        ? { username: { $regex: keyword, $options: 'i' } }
        : {};

      return service.find(searchQuery);
    }
  );

  fastify.get('/:id', async (request, reply) => {
    return service.findById(request.params.id, {
      path: 'collections',
      populate: {
        path: 'movies author',
      },
    });
  });

  fastify.patch(
    '/',
    { ...Schemas.updateUser, preHandler: fastify.useAccessAuth },
    async (request, reply) => {
      const result = await service.update(
        { _id: request.user.id },
        request.body
      );

      return result || Error('Not found');
    }
  );

  fastify.delete(
    '/',
    { ...Schemas.deleteUser, preHandler: fastify.useAccessAuth },
    async (request, reply) => {
      const result = await service.delete({
        _id: request.user.id,
      });

      return result.deletedCount > 0 ? { deleted: true } : Error('Not found');
    }
  );
};
