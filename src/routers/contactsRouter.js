import express from 'express';
import {
  getContactByIdController,
  deleteContactController,
} from '../controllers/contacts.js';

const contactRouter = express.Router();

contactRouter.get('/');
contactRouter.get('/:contactId', getContactByIdController);
contactRouter.delete('/:contactId', deleteContactController);
contactRouter.patch('/:contactId');
contactRouter.post('/');

export default contactRouter;
