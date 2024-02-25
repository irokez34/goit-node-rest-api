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

    res.send(contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  const { id } = req.params;

  try {
    const contact = await Contact.findByIdAndDelete(id);

    res.send(contact);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  const { body } = req;

  try {
    const newContact = createContactSchema.validate(body);
    if (newContact.error) {
      throw HttpError(400);
    }
    const contact = await Contact.create(newContact.value);
    if (!contact) {
      throw new Error();
    }
    res.send(contact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  const { body } = req;
  const { id } = req.params;
  try {
    const { error, value } = updateContactSchema.validate(body);
    console.log(value);
    if (error) {
      throw HttpError(400);
    }
    const contact = await Contact.findByIdAndUpdate(id, value, { new: true });
    if (!contact) {
      throw HttpError(404);
    }
    res.send(contact);
  } catch (error) {
    next(error);
  }
};

export const toggleFavoriteContact = async (req, res, next) => {
  const { body } = req;
  const { id } = req.params;
  try {
    const { error, value } = toggleFavoriteContactSchema.validate(body);
    if (error) {
      throw HttpError(400);
    }

    const status = await updateStatusContact(id, value);
    if (!status) {
      throw new Error();
    }
    res.send(status);
  } catch (error) {
    next(error);
  }
};
