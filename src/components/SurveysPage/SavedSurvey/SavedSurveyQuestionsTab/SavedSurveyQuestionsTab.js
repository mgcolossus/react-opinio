import React from "react";
import { Grid, TextField } from "@material-ui/core";
import SavedSurveyElements from "../SavedSurveyElements";
import TabPanel from "../TabPanel";

function SavedSurveyQuestionsTab({ tabValue, surveyData }) {
  return (
    <TabPanel value={tabValue} index={0}>
      <Grid item xs={12}>
        <TextField fullWidth label="Название опроса" variant="outlined" size="small" value={surveyData.title} />
      </Grid>
      <Grid item xs={12}>
        <TextField fullWidth multiline label="Примечание" variant="outlined" size="small" value={surveyData.note} />
      </Grid>
      <SavedSurveyElements surveyElementsData={surveyData.elements} />
    </TabPanel>
  );
}

export default SavedSurveyQuestionsTab;
