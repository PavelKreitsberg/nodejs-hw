const { User } = require("../models");

const jwt = require("jsonwebtoken");

require("dotenv").config();

const { SECRET_KEY } = process.env;

// const { Unauthorized } = require("http-errors");

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (!bearer || bearer !== "Bearer") {
    return res.status(401).json("Not authorized");
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || token !== user.token) {
      return res.status(401).json("Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json("Not authorized");
  }

  // const { authorization = "" } = req.headers;
  // const [bearer, token] = authorization.split(" ");
  // if (!bearer || bearer !== "Bearer") {
  //   throw new Unauthorized("Not authorized");
  // }

  // try {
  //   const { id } = jwt.verify(token, SECRET_KEY);
  //   const user = await User.findById(id);
  //   if (!user || token !== user.token) {
  //     throw new Unauthorized("Not authorized");
  //   }
  //   req.user = user;
  //   next();
  // } catch (error) {
  //   if (error.message === "Invalid signature") {
  //     error.status = 401;
  //   }
  //   next(error);
  // }
};

module.exports = auth;
