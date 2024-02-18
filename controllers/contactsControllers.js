import { listContacts } from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
    try {
      const contacts = await listContacts();
      console.log(contacts);
      res.send(contacts);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };
  

export const getOneContact = (req, res) => {};

export const deleteContact = (req, res) => {};

export const createContact = (req, res) => {};

export const updateContact = (req, res) => {};
