const { updateContact } = require("../../models/contacts");

const updateContactById = async (req, res, next) => {
  const id = req.params.contactId;
  const result = await updateContact(id, req.body);
  if (!result) {
    res.status(404).json({
      status: "Not Found",
      code: 404,
      message: "Not found",
    });
    return;
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateContactById;
