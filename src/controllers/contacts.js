import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContacts,
} from '../services/contacts.js';

import createHttpError from 'http-errors';

import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { parseSortParams } from '../utils/parseSortParams.js';
// import { parseFilterParams } from '../utils/parseFilterParams.js';

import mongoose from 'mongoose';

export const getContactsController = async (req, res) => {
  const { page, perPage } = calculatePaginationData(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  // const filter = parseFilterParams(req.query);
  console.log(page, perPage, sortBy, sortOrder);
  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
  });

  res.status(200).json({
    data: contacts,
    status: 200,
    message: 'Successfully found contacts!',
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return res.status(400).json({
      data: 'Id is not valid',
    });
  }
  const contact = await getContactById(contactId);
  if (!contact) {
    next(createHttpError(404, 'Not found'));
    return;
  }
  res.status(200).json({
    data: contact,
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
  });
};

export const createContactController = async (req, res) => {
  const contact = await createContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await updateContacts(contactId, req.body);
  if (!result) {
    next(createHttpError(404, 'Not found'));
    return;
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return res.status(400).json({
      data: 'Id is not valid',
    });
  }
  const contact = await deleteContact(contactId);
  if (!contact) {
    next(createHttpError(404, 'Not found'));
    return;
  }
  res.status(204).send();
};
