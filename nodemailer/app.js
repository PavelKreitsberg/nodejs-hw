const nodemailer = require("nodemailer");

require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "pavlo.kreitsberg@meta.ua",
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const email = {
  to: "leros49132@ezgiant.com",
  from: "pavlo.kreitsberg@meta.ua",
  subject: "Verification letter",
  html: "<p>Click to verificate</p>",
};

transporter
  .sendMail(email)
  .then(() => {
    console.log("Email sent");
  })
  .catch((error) => console.log(error.message));
