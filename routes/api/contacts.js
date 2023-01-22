const express = require("express");

const router = express.Router();

const { auth, validation, ctrlWrapper } = require("../../middlewares");

const { joiSchema, favoriteJoiSchema } = require("../../models/contact");

const { contacts: ctrl } = require("../../controllers");

router.get("/", auth, ctrlWrapper(ctrl.getAllContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", auth, validation(joiSchema), ctrlWrapper(ctrl.addNewContact));

router.delete("/:contactId", ctrlWrapper(ctrl.removeContactById));

router.patch(
  "/:contactId/favorite",
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateFavoriteById)
);

router.put(
  "/:contactId",
  validation(joiSchema),
  ctrlWrapper(ctrl.updateContactById)
);

module.exports = router;
