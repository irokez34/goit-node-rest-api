import HttpError from "../helpers/HttpError.js";
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContactService,
} from "../services/contactsServices.js";
import crypto from "node:crypto";

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    if (!contacts) {
      throw HttpError(400);
    }
    res.status(200).send(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await getContactById(id);
    if (contact === null) {
      throw HttpError(404);
    }
    res.status(200).send(contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await removeContact(id);
    if (contact === null) {
      throw HttpError(404);
    }
    res.status(200).send(contact);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res) => {
  const newContact = { id: crypto.randomUUID(), ...req.body };
  await addContact(newContact);
  res.status(201).send(newContact);
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const contact = await updateContactService(id, body);
    if (!contact) {
      HttpError(404);
    }
    res.status(200).send(contact);
  } catch (error) {
    next(error);
  }
};
