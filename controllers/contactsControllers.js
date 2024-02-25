import Contact from "../model/contactsSchema.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.send(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = (req, res) => {
  res.send("getOneContact");
};

export const deleteContact = (req, res) => {
  res.send("deleteContact");
};

export const createContact = (req, res) => {
  res.send("createContact");
};

export const updateContact = (req, res) => {
  res.send("updateContact");
};
