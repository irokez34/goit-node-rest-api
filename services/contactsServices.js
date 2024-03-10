import Contact from "../schemas/contactsSchemas.js";

export async function updateStatusContact(contactId, body) {
  const contact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });

  return contact;
}
