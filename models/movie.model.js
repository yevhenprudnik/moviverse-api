import { Schema, model } from 'mongoose';

const movieSchema = new Schema(
  {
    title: { type: String, required: [true, 'Set  title'] },
    subTitle: { type: String, required: false },
    genre: [{ type: String, required: [true, 'Set at least one genre'] }],
    year: { type: Number, required: [true, 'Set release year'] },
    director: { type: String, required: false },
    image: { type: String, required: false },
    trailer: { type: String, required: false },
    synopsis: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const Movie = model('movie', movieSchema);

export default Movie;
