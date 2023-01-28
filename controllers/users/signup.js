const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");

const gravatar = require("gravatar");

const { User } = require("../../models");

const signup = async (req, res, next) => {
  const { password, email, subscription, token } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarUrl = gravatar.url(email);

  const result = await User.create({
    password: hashPassword,
    email,
    subscription,
    token,
    avatarUrl,
  });
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
