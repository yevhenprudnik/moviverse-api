import * as env from 'dotenv';
env.config({ path: '../.env' });

import mongoose from 'mongoose';
import Movie from '../models/movie.model.js';
import { movies } from './moovie/data.js';

console.log(process.env);

await mongoose.connect(process.env.DB_CONNECTION);
console.log('Connected to database');

console.log('Started seeding movies');

for (const item of movies) {
  const movie = new Movie(item);

  await movie.save();
}
