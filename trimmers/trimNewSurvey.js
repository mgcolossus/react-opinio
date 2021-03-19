function trimNewSurvey(surveyData) {
  surveyData.title = surveyData.title.trim();
  surveyData.elements = surveyData.elements.map(element => {
    return {
      ...element,
      question: element.question.trim(),
      
    }
  })
}