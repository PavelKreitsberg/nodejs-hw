const express = require("express");

const router = express.Router();

const { auth, validation, upload, ctrlWrapper } = require("../../middlewares");

const { joiSignupSchema, joiLoginSchema } = require("../../models/user");

const { users: ctrl } = require("../../controllers");

router.post("/signup", validation(joiSignupSchema), ctrlWrapper(ctrl.signup));

router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

router.post("/logout", auth, ctrlWrapper(ctrl.logout));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
