import { setupServer } from './server';

import { initMongoConnection } from './db/initMongoConnection.js';

const getContacts = async () => {
  await initMongoConnection();
  setupServer();
};

getContacts();
