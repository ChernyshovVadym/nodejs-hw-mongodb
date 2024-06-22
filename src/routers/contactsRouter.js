import express from 'express';
import {
  getContactByIdController,
  deleteContactController,
  createContactController,
} from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema } from '../validation/contacts.js';

const contactRouter = express.Router();

contactRouter.get('/');
contactRouter.get('/:contactId', getContactByIdController);
contactRouter.delete('/contacts/:contactId', deleteContactController);
contactRouter.patch('/contacts/:contactId');
contactRouter.post(
  '/contacts',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

export default contactRouter;
contactRouter;
