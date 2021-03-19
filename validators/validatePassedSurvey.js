const DbInterface = require("../database");

const countUnmatchedAnswers = (values, allowedValues) => {
  const unmatched = values.reduce((counter, currentAnswer) => {
    if (!allowedValues.includes(currentAnswer)) {
      return counter + 1;
    }
    return counter;
  }, 0);
  return unmatched;
};

function validatePassedSurvey(passedSurveyData, elementsProperties) {
  try {
    const error = {};
    if (Object.keys(passedSurveyData).length === Object.keys(elementsProperties).length) {
      for (let key in elementsProperties) {
        if (passedSurveyData[key] !== undefined) {
          if (elementsProperties[key].type === "text") {
            if (typeof passedSurveyData[key] === "string") {
              passedSurveyData[key] = passedSurveyData[key].trim();
              if (elementsProperties[key].required === true && passedSurveyData[key] === "") {
                error.message = `Value of '${key}' key must not be empty string. The question type: 'text'`;
                return { error };
              }
            } else {
              error.message = `Value of '${key}' key must be instance of String. The question type: 'text'`;
              return { error };
            }
          }

          if (elementsProperties[key].type === "oneSelection") {
            if (typeof passedSurveyData[key] === "string") {
              passedSurveyData[key] = passedSurveyData[key].trim();
              if (elementsProperties[key].required === true && passedSurveyData[key] === "") {
                error.message = `Value of '${key}' key must not be empty string. The question type: 'oneSelection'`;
                return { error };
              }
              if (
                !(
                  elementsProperties[key].options.includes(passedSurveyData[key]) ||
                  elementsProperties[key].otherOptionAllowed
                )
              ) {
                error.message = `Value of '${key}' isn't presented in possible answers of question. The question type: 'oneSelection'`;
                return { error };
              }
            } else {
              error.message = `Value of '${key}' key must be instance of String. The question type: 'oneSelection'`;
              return { error };
            }
          }

          if (elementsProperties[key].type === "manySelections") {
            if (passedSurveyData[key] instanceof Array) {
              if (elementsProperties[key].required === true && passedSurveyData[key] === []) {
                error.message = `Value of '${key}' key must not be an empty array. The question type: 'manySelections'`;
                return { error };
              }
              if (
                passedSurveyData[key].filter((value) => typeof value === "string").length !==
                passedSurveyData[key].length
              ) {
                error.message = `All answer options must be a string. The question type: 'manySelections'. The key: '${key}'`;
                return { error };
              }
              passedSurveyData[key] = passedSurveyData[key].map((option) => option.trim());
              if (passedSurveyData[key].some((option) => option === "")) {
                error.message = `Option must not be an empty string. The question type: 'manySelections'. The key: '${key}'`;
                return { error };
              }
              if (
                !elementsProperties[key].otherOptionAllowed &&
                countUnmatchedAnswers(passedSurveyData[key], elementsProperties[key].options) !== 0
              ) {
                error.message = `Some values of '${key}' key are not presented in possible answers to the question. The question type: 'manySelections'`;
                return { error };
              }
              if (
                elementsProperties[key].otherOptionAllowed &&
                countUnmatchedAnswers(passedSurveyData[key], elementsProperties[key].options) > 1
              ) {
                error.message = `There are more than 1 option that is not included in possible answers to the question. The question type: 'manySelections'. The key: '${key}'`;
                return { error };
              }
            } else {
              error.message = `Value of '${key}' key must be instance of Array. The question type: 'manySelections'`;
              return { error };
            }
          }
        } else {
          error.message = `'${key}' key doesn\'t exist in survey`;
          return { error };
        }
      }
      return { value: passedSurveyData };
    } else {
      error.message =
        "Passed data is invalid: a number of keys of the passed data doesn't match with the expected number of keys";
      return { error };
    }
  } catch (error) {
    throw error;
  }
}

module.exports = validatePassedSurvey;
