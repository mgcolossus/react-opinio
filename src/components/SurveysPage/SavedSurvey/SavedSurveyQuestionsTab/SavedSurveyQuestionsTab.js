import React from "react";
import { Grid, TextField, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SavedSurveyElements from "../SavedSurveyElements";
import TabPanel from "../TabPanel";

const useStyles = makeStyles((theme) => ({
  titleTypography: {
    wordBreak: "break-all",
  },
  noteTypography: {
    wordBreak: "break-all",
  },
}));

function SavedSurveyQuestionsTab({ tabValue, surveyData }) {
  const classes = useStyles();
  return (
    <TabPanel value={tabValue} index={0}>
      <Grid item xs={12}>
        <Paper elevation={3} className="paper">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography className={classes.titleTypography} variant="h4">
                {surveyData.title}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.noteTypography} variant="h5">
                {surveyData.note}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <SavedSurveyElements surveyElementsData={surveyData.elements} />
    </TabPanel>
  );
}

export default SavedSurveyQuestionsTab;
