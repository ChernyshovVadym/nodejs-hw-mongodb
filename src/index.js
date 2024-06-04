import { setupServer } from './server';

const getContacts = async () => {
  await initMongoConnection();
  setupServer();
};

getContacts();
