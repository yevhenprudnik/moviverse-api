import Collection from '../models/collection.model.js';
import { EntityService } from './entity.service.js';

export class CollectionService extends EntityService {
  constructor() {
    super(Collection);
  }
}
