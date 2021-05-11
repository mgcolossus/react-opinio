import React from "react";
import { Grid, TextField, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SavedSurveyElements from "../SavedSurveyElements";
import TabPanel from "../TabPanel";

const useStyles = makeStyles((theme) => ({
  titleInput: {
    fontSize: "36px",
    fontWeight: 700,
  },
  noteInput: {
    fontSize: "20px",
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
              <TextField
                fullWidth
                multiline
                placeholder="Название опроса"
                value={surveyData.title}
                InputProps={{ className: classes.titleInput }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                placeholder="Примечание"
                multiline
                value={surveyData.note}
                InputProps={{ className: classes.noteInput }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <SavedSurveyElements surveyElementsData={surveyData.elements} />
    </TabPanel>
  );
}

export default SavedSurveyQuestionsTab;
