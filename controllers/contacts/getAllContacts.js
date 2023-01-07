const { getAll } = require("../../models/contacts");

const getAllContacts = async (req, res, next) => {
  const data = await getAll();
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result: data,
    },
  });
};
module.exports = getAllContacts;
