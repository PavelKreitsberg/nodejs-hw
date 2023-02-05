const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { User } = require("../../models");
const { v4 } = require("uuid");
const sendEmail = require("../../sengrid/helpers/sendEmail");

const signup = async (req, res, next) => {
  const { password, email, subscription, token } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }

  const verificationToken = v4();

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarUrl = gravatar.url(email);

  const result = await User.create({
    password: hashPassword,
    email,
    subscription,
    token,
    avatarUrl,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Verification letter",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Click to verificate your acc</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    status: "success",
    code: 201,
    user: {
      email,
      subscription,
      avatarUrl,
    },
  });
};

module.exports = signup;
