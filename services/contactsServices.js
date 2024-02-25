import HttpError from "../helpers/HttpError.js";
import Contact from "../model/contactsSchema.js";

export async function updateStatusContact(contactId, body) {
  const contact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!contact) {
    return HttpError(404);
  }
  return contact;
}
