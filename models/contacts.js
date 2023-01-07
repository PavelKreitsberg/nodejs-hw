const fs = require('fs').promises;

const path = require('path');

const contactsPath = path.join(__dirname, "./contacts.json")

const getAll = async () => {
  const data = await fs.readFile(contactsPath, 'utf8') 
  return JSON.parse(data);
}

const getById = async (contactId) => {
  const data = await fs.readFile(contactsPath, 'utf8')
  return JSON.parse(data).find(contact => contact.id === String(contactId)) 
}

const addContact = async (body) => {  
  const data = await fs.readFile(contactsPath, 'utf8')
  fs.writeFile(contactsPath, JSON.stringify([...JSON.parse(data), body]))  
}

const removeContact = async (contactId) => {
  const data = await fs.readFile(contactsPath, 'utf8')

  const contactList = JSON.parse(data);

  const index = contactList.findIndex(contact => contact.id === String(contactId));
  if (index === -1) {
    return null;
  }
  const deletedContact = contactList[index]
  contactList.splice(index, 1)
  fs.writeFile(contactsPath, JSON.stringify(contactList))
  return deletedContact;
}



const updateContact = async (contactId, body) => {
  const data = await fs.readFile(contactsPath, 'utf8');

  const contactList = JSON.parse(data)

  const index = contactList.findIndex(contact => contact.id === String(contactId));
  if (index === -1) {
    return null;
  }
  contactList[index] = {id: contactId, ...body}

  fs.writeFile(contactsPath, JSON.stringify(contactList))
  return contactList[index];
}

module.exports = {
  getAll,
  getById,
  removeContact,
  addContact,
  updateContact,
}
