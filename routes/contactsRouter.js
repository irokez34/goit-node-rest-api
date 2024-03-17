import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  toggleFavoriteContact,
} from "../controllers/contactsControllers.js";
import { auth } from "../middleware/auth.js";
import { schemasContact } from "../schemas/contactsSchemas.js";
import validateBody from "../helpers/validateBody.js";

const contactsRouter = express.Router();

contactsRouter.get("/", auth, getAllContacts);

contactsRouter.get("/:id", auth, getOneContact);

contactsRouter.delete("/:id", auth, deleteContact);

contactsRouter.post("/", auth, validateBody(schemasContact.createContactSchema), createContact);

contactsRouter.put("/:id", auth, validateBody(schemasContact.updateContactSchema), updateContact);

contactsRouter.patch(
  "/:id/favorite",
  auth,
  validateBody(schemasContact.updateFavoriteSchema),
  toggleFavoriteContact
);

export default contactsRouter;
