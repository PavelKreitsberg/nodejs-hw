const { Contact } = require("../../models");

const getAllContacts = async (req, res, next) => {
  const data = await Contact.find();
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result: data,
    },
  });
};
module.exports = getAllContacts;
