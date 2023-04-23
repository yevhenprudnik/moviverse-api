import User from '../models/user.model.js';
import { EntityService } from './entity.service.js';

export class UserService extends EntityService {
  constructor() {
    super(User);
  }
}
