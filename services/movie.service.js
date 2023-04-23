import Movie from '../models/movie.model.js';
import { EntityService } from './entity.service.js';

export class MovieService extends EntityService {
  constructor() {
    super(Movie);
  }
}
