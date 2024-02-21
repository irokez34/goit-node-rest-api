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
    res.status(200).send(contacts);
    if (!contacts) {
      throw new Error();
    }
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await getContactById(id);
    if (contact === null) {
      throw new Error("Not Found");
    }
    res.status(200).send(contact);
  } catch (error) {
    res.status(404);
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await removeContact(id);
    if (contact === null) {
      throw new Error();
    }
    res.status(200).send(contact);
  } catch (error) {
    res.status(404);
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
      throw new Error('Not Found');
    }
    res.status(200).send(contact);
  } catch (error) {
    res.status(404);
    next(error);
  }
};
