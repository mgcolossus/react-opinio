import React from "react";
import TabPanel from "../TabPanel";
import SurveyAnswers from "./SurveyAnswers";

function SavedSurveyAnswersTab({ tabValue, surveyData }) {
  return (
    <TabPanel value={tabValue} index={1}>
      <SurveyAnswers surveyId={surveyData.surveyId} />
    </TabPanel>
  );
}

export default SavedSurveyAnswersTab;
