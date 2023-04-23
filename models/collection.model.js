import mongoose, { Schema, model } from 'mongoose';
import User from './user.model.js';

const collectionSchema = new Schema(
  {
    title: { type: String, required: [true, 'Set  title'] },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: false,
    },
    movies: [
      { type: mongoose.SchemaTypes.ObjectId, ref: 'movie', default: [] },
    ],
  },
  {
    timestamps: true,
  }
);

collectionSchema.pre('save', async function (next) {
  if (this.isModified('author')) {
    const user = await User.findById(this.author);

    user.collections.push(this.id);

    await user.save();
  }
  next();
});

const Collection = model('collection', collectionSchema);

export default Collection;
