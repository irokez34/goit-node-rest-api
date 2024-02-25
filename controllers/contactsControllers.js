import HttpError from "../helpers/HttpError.js";
import Contact from "../model/contactsSchema.js";
import { createContactSchema } from "../schemas/contactsSchemas.js";

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
    console.log(error);
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
  const body = req.body;
  const newContact = (validateBody(createContactSchema), body);
  console.log(newContact);
  try {
    const contact = await Contact.create();
  } catch (error) {}
  res.send("createContact");
};

export const updateContact = (req, res) => {
  res.send("updateContact");
};
