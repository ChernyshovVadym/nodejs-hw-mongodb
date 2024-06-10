import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
// import mongoose from 'mongoose';
import { env } from './utils/env.js';
// import { ENV_VARS } from './db/initMongoConnection.js';
// import { getAllContacts, getContactById } from './services/contacts.js';

const PORT = env('PORT', '3000');

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use((err, req, res) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
