import mongoose, { Schema, model } from 'mongoose';
import * as bcrypt from 'bcrypt';

const userSchema = new Schema(
  {
    username: { type: String, required: [true, 'Set  username'] },
    email: {
      type: String,
      require: [true, 'Set email for user'],
      unique: true,
      validate(value) {
        const re = /\S+@\S+\.\S+/;

        return re.test(String(value).trim().toLocaleLowerCase());
      },
    },
    password: { type: String, default: null },
    collections: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'collection' }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(6);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const User = model('user', userSchema);

export default User;
