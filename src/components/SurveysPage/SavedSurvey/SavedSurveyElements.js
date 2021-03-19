import React from "react";
import SurveyElement from "../../shared/SurveyElement";
import { observer } from 'mobx-react-lite';

function SavedSurveyElements({ surveyElementsData }) {
  return surveyElementsData.map((elementData, index) => {
    return <SurveyElement key={elementData.elementId} elementData={elementData} index={index} />;
  });
}

export default observer(SavedSurveyElements);
