const { Contact } = require("../../models");

const updateFavoriteById = async (req, res, next) => {
  const id = req.params.contactId;
  const { favorite } = req.body;

  const result = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );
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

module.exports = updateFavoriteById;
