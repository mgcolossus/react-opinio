import { Grid } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { SavedSurveyAnswersTab } from "./SavedSurveyAnswersTab";
import SavedSurveyGetLinkDialog from "./SavedSurveyGetLinkDialog";
import SavedSurveyHeader from "./SavedSurveyHeader";
import { SavedSurveyQuestionsTab } from "./SavedSurveyQuestionsTab";

function SavedSurvey({ surveyData }) {
  const [isGetLinkDialogOpen, setIsGetLinkDialogOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);


  const changeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const openGetLinkDialog = () => {
    setIsGetLinkDialogOpen(true);
  };
  const closeGetLinkDialog = () => {
    setIsGetLinkDialogOpen(false);
  };

  return (
    <>
      <Grid container spacing={2}>
        <SavedSurveyHeader tabValue={tabValue} changeTab={changeTab} openGetLinkDialog={openGetLinkDialog} />
        <SavedSurveyQuestionsTab tabValue={tabValue} surveyData={surveyData} />
        <SavedSurveyAnswersTab tabValue={tabValue} surveyData={surveyData} />
      </Grid>
      {isGetLinkDialogOpen ? (
        <SavedSurveyGetLinkDialog
          isOpen={isGetLinkDialogOpen}
          onClose={closeGetLinkDialog}
          surveyId={surveyData.surveyId}
        />
      ) : null}
    </>
  );
}

export default observer(SavedSurvey);
