import React from "react";
import { FormControl, Grid, Input, Paper } from "@material-ui/core";

function SurveyFormElement({ elementData }) {
  return (
    <Grid item xs={12}>
      <Paper className="paper">
        <FormControl fullWidth>
          <Input
            className="survey-element__title"
            multiline
            value={`${elementData.question}${elementData.required ? "*" : ""}`}
          />
        </FormControl>
      </Paper>
    </Grid>
  );
}

export default SurveyFormElement;
