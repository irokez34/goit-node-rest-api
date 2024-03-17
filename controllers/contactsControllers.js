import HttpError from "../helpers/HttpError.js";
import Contact from "../schemas/contactsSchemas.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;

    const contacts = await Contact.find({ owner });
    res.send(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  const { id } = req.params;

  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      throw HttpError(404);
    }
    res.send(contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      throw HttpError(404);
    }
    res.send(contact);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  const { body } = req;
  const { _id: owner } = req.user;
  try {
    const newContact = { ...body, owner };
    const contact = await Contact.create(newContact);
    if (!contact) {
      throw HttpError(401);
    }
    res.status(201).send(contact);
  } catch (error) {
    next(error);
  }
};
export const updateContact = async (req, res, next) => {
  const { body } = req;
  const { id } = req.params;

  try {
    const updatedContact = await Contact.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!updatedContact) {
      throw HttpError(404);
    }
    res.send(updatedContact);
  } catch (error) {
    next(error);
  }
};

export const toggleFavoriteContact = async (req, res, next) => {
  const { body } = req;
  const { id } = req.params;
  try {
    const contact = Contact.findByIdAndUpdate(id, body, { new: true });
    if (!contact) {
      throw new HttpError(404);
    }

    res.send(contact);
  } catch (error) {
    next(error);
  }
};
