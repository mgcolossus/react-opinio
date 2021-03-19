function getStatsFromPassedSurveysData(passedSurveysData, surveyElementsProperties) {
  const stats = {
    passedCounter: passedSurveysData.length,
    questionIds : {}
  };

  Object.keys(surveyElementsProperties).forEach((key) => {
    stats.questionIds[key] = {};
    stats.questionIds[key].question = surveyElementsProperties[key].question;
    switch (surveyElementsProperties[key].type) {
      case "text": {
        stats.questionIds[key].answerType = "text";
        stats.questionIds[key].answers = [];
        stats.questionIds[key].unanswered = 0;
        break;
      }
      case "oneSelection": {
        stats.questionIds[key].answerType = "oneSelection";
        stats.questionIds[key].answers = {};
        stats.questionIds[key].totalAnswersCount = 0;
        stats.questionIds[key].unanswered = 0;
        break;
      }
      case "manySelections": {
        stats.questionIds[key].answerType = "oneSelection";
        stats.questionIds[key].answers = {};
        stats.questionIds[key].totalAnswersCount = 0;
        stats.questionIds[key].unanswered = 0;
        break;
      }
      default:
        throw Error("Unknown type of question");
    }
  });

  passedSurveysData.forEach((passedSurvey) => {
    Object.keys(passedSurvey).forEach((key) => {
      switch (surveyElementsProperties[key].type) {
        case "text":
          if (passedSurvey[key] === "") {
            stats.questionIds[key].unanswered++;
          } else {
            stats.questionIds[key].answers.push(passedSurvey[key]);
          }
          break;
        case "oneSelection":
          const answerText = passedSurvey[key];
          if (answerText === "") {
            stats.questionIds[key].unanswered++;
          } else {
            if (stats.questionIds[key].answers[answerText] == undefined) {
              stats.questionIds[key].answers[answerText] = 1;
              stats.questionIds[key].totalAnswersCount++
            } else {
              stats.questionIds[key].answers[answerText]++;
              stats.questionIds[key].totalAnswersCount++
            }
          }
          break;
        case "manySelections":
          const answersArray = passedSurvey[key];
          if (answersArray.length === 0) {
            stats.questionIds[key].unanswered++;
          } else {
            answersArray.forEach((answerText) => {
              if (stats.questionIds[key].answers[answerText] == undefined) {
                stats.questionIds[key].answers[answerText] = 1;
                stats.questionIds[key].totalAnswersCount++
              } else {
                stats.questionIds[key].answers[answerText]++;
                stats.questionIds[key].totalAnswersCount++
              }
            });
          }
          break;
        default:
          throw Error("Unknown type of question");
      }
    });
  });
  return stats;
}

module.exports = getStatsFromPassedSurveysData;

