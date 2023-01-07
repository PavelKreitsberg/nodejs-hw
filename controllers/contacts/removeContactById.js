const {removeContact} = require('../../models/contacts')

const removeContactById = async (req, res, next) => {
    const id = req.params.contactId;
    const result = await removeContact(id);
    if (!result) {
      res.status(404).json({
        status: "Not Found",
        code: 404,
        message: `Contact with ${id} not found`
      })
    }

    res.status(200).json({
      status: "success",
      code: 200,
      message: `Contact ${result.name} deleted`
    })
}

module.exports = removeContactById;