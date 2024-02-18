import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const contactsPath = path.join(process.cwd(), "db", "contacts.json");

export async function listContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(data);
}

function writeContact(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts));
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const deleteContact = contacts[index];
  contacts.splice(index, 1);
  await writeContact(contacts);
  return deleteContact;
}

export async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  contacts.push(newContact);
  await writeContact(contacts);
  return newContact;
}
