const { addContact } = require("../../models/contacts");

const addNewContact = async (req, res, next) => {
  const newContact = {
    ...req.body,
    id: String(Math.round(Math.random() * 1000)),
  };
  await addContact(newContact);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result: newContact,
    },
  });
};

module.exports = addNewContact;
