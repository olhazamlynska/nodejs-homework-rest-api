const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    return console.log(error.message);
  }
}

async function getContactById(id) {
  try {
    const contacts = await listContacts();
    const result = contacts.find((contact) => contact.id === id);
    return result || null;
  } catch (error) {
    return console.log(error.message);
  }
}

async function removeContact(id) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === id);
    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  } catch (error) {
    return console.log(error.message);
  }
}

async function addContact({ name, email, phone }) {
  try {
    const contacts = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    return console.log(error.message);
  }
}

async function updateContact(contactsId, body) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactsId);
    if (index === -1) {
      return null;
    }
    contacts[index] = { id: contactsId, ...body };

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
  } catch (error) {
    return console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
