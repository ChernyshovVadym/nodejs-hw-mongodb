import mongoose from 'mongoose';
import { env } from '../utils/env';

export const initMongoConnection = async () => {
  try {
    const user = env('MONGODB_USER');
  } catch (error) {
    console.log(error);
    throw error;
  }
};
