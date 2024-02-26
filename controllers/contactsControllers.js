import HttpError from "../helpers/HttpError.js";
import Contact from "../model/contactsSchema.js";
import {
  createContactSchema,
  toggleFavoriteContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import { updateStatusContact } from "../services/contactsServices.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.send(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  const { id } = req.params;

  try {
    const contact = await Contact.findById(id);
    console.log(contact);
    res.send(contact);
  } catch (error) {
    next(HttpError(404));
  }
};

export const deleteContact = async (req, res, next) => {
  const { id } = req.params;

  try {
    const contact = await Contact.findByIdAndDelete(id);

    res.send(contact);
  } catch (error) {
    next(HttpError(404));
  }
};

export const createContact = async (req, res, next) => {
  const { body } = req;
  const newContact = { ...body };
  const contact = await Contact.create(newContact);
  res.status(201).send(contact);
};

export const updateContact = async (req, res, next) => {
  const { body } = req;
  const { id } = req.params;

  try {
    const contact = await Contact.findById(id);

    if (!contact) {
      throw HttpError(404);
    }
    const updatedContact = await Contact.findByIdAndUpdate(id, body, { new: true });
    res.send(updatedContact);
  } catch (error) {
    next(HttpError(404));
  }
};

export const toggleFavoriteContact = async (req, res, next) => {
  const { body } = req;
  const { id } = req.params;
  try {
    const contact = Contact.findById(id);
    if (!contact) {
      throw new HttpError(404);
    }
    const status = await updateStatusContact(id, body);

    res.send(status);
  } catch (error) {
    next(HttpError(404));
  }
};
