const Joi = require("joi");

async function validateSurvey(req, res, next) {
  const surveyValidationSchema = Joi.object({
    title: Joi.string().trim().required(),
    note: Joi.string().trim().allow("").required(),
    surveyId: Joi.string().required(),
    elements: Joi.array()
      .items(
        Joi.object({
          question: Joi.string().trim().required(),
          required: Joi.boolean().required(),
          elementId: Joi.string().required(),
          type: Joi.string()
            .valid("text", "oneSelection", "manySelections")
            .required(),
          options: Joi.when("type", {
            switch: [
              {
                is: Joi.string().valid("oneSelection", "manySelections"),
                then: Joi.array().items(Joi.string().required()),
              },
              {
                is: Joi.string().valid("text"),
                then: Joi.any().forbidden(),
              },
            ],
          }),
          otherOptionAllowed: Joi.when("type", {
            switch: [
              {
                is: Joi.string().valid("oneSelection", "manySelections"),
                then: Joi.boolean().required()
              },
              {
                is: Joi.string().valid("text"),
                then: Joi.any().forbidden(),
              },
            ],
          }),
        })
      )
      .required(),
  });

  const surveyData = req.body;
  const {value, error} = surveyValidationSchema.validate(surveyData);
  if (error) {
    return res.status(422).send("Invalid survey data");
  }
  req.validatedBody = value;
  next();
}

module.exports = validateSurvey;
