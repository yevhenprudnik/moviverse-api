'use strict';

import fp from 'fastify-plugin';
import mongoose from 'mongoose';
import { DB_CONNECTION } from '../environment.js';

export default fp(async fastify => {
  try {
    mongoose.connect(DB_CONNECTION);

    console.log('Connected to database');
  } catch (e) {
    console.log(e);
  }
});
