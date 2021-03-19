const Joi = require("joi");
const DbInterface = require("../database");
const bcrypt = require("bcryptjs");

async function validateLogIn(req, res, next) {
  const noSpaces = /^\S*$/; // to exclude 'space' symbolsa
  const logInValidationSchema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.base": "Invalid email",
      "string.pattern.base": "Invalid email",
      "string.empty": "Email field is empty",
      "string.min": "Name is too short",
      "string.max": "Name is too long",
      "string.email": "Invalid email",
      "any.required": "Name is required",
    }),
    password: Joi.string().min(6).max(63).regex(noSpaces).required().messages({
      "string.base": "Invalid password",
      "string.empty": "Password field is empty",
      "string.min": "Password is too short",
      "string.max": "Password is too long",
      "string.pattern.base": "Invalid password",
      "any.required": "Password is required",
    }),
  });

  const email = req.body.email;
  const password = req.body.password;

  const user = await DbInterface.getUserByEmail(email);
  if (!user) {
    return res.status(422).send("User not found");
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(422).send("Wrong password");
  }

  const { error } = logInValidationSchema.validate({ email, password });
  if (error) {
    const errorMessage = error.details[0].message;
    console.log(errorMessage);
    return res.status(422).send(errorMessage);
  }
  
  next();
}

module.exports = validateLogIn;
