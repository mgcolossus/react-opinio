const Joi = require("joi");
const DbInterface = require("../database");

async function validateSignUp(req, res, next) {
  const noSpaces = /^\S*$/; // to exclude 'space' symbols
  const signUpValidationSchema = Joi.object({
    name: Joi.string().min(2).max(20).regex(noSpaces).required().messages({
      "string.base": "Invalid name",
      "string.empty": "name field is empty",
      "string.min": "name is too short",
      "string.max": "name is too long",
      "string.pattern.base": "Invalid name",
      "any.required": "name is required",
    }),
    email: Joi.string().email().required().messages({
      "string.base": "Invalid email",
      "string.pattern.base": "Invalid email",
      "string.empty": "Email field is empty",
      "string.min": "Email is too short",
      "string.max": "Email is too long",
      "string.email": "Invalid email",
      "any.required": "Email is required",
    }),
    password: Joi.string().min(6).max(63).regex(noSpaces).required().messages({
      "string.base": "Invalid password",
      "string.empty": "Password field is empty",
      "string.min": "Password is too short",
      "string.max": "Password is too long",
      "string.pattern.base": "Invalid password",
      "any.required": "Password is required",
    }),
    passwordConfirmation: Joi.valid(Joi.ref("password")).messages({
      "any.only": "Password and confirmation don't match",
    }),
  });

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const passwordConfirmation = req.body.passwordConfirmation;

  if (await DbInterface.getUserByEmail(email)) {
    return res.status(422).send("Email is already signed up");
  }
  const { error } = signUpValidationSchema.validate({
    name,
    email,
    password,
    passwordConfirmation,
  });
  if (error) {
    const errorMessage = error.details[0].message;
    return res.status(422).send(errorMessage);
  }
  next();
}

module.exports = validateSignUp;
