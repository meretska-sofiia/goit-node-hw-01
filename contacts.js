const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve('./db/contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const parseData = JSON.parse(data);
    console.table(parseData);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async contactId => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const parseData = JSON.parse(data);
    const contact = parseData.find((el, indx) => {
      if (el.id === contactId.toString()) {
        console.log(data[indx]);
        return data[indx];
      }
    });
    console.table(contact);
    return contact;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async contactId => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const parseData = JSON.parse(data);
    const index = parseData.findIndex(el => el.id === contactId);
    if (index < 0) {
      return console.warn(`\x1B[31m Сontact with id ${contactId} is not in the list`);
    }
    parseData.splice(index, 1);
    console.table(parseData);
    return await fs.writeFile(contactsPath, JSON.stringify(parseData), 'utf8');
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const parseData = JSON.parse(data);
    const id = parseData.reduce((acc, el) => {
      if (Number(el.id) > acc) {
        acc = Number(el.id);
        return acc;
      }
    }, 0);
    const newContact = {
      id: (id + 1).toString(),
      name,
      email,
      phone,
    };
    const contactsName = parseData.map(el => el.name);
    if (contactsName.includes(newContact.name)) {
      return console.warn(`\x1B[31m Contact ${newContact.name} is already in list`);
    }
    const newContacts = [...parseData, newContact];
    console.table(newContacts);

    return await fs.writeFile(contactsPath, JSON.stringify(newContacts), 'utf8');
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
