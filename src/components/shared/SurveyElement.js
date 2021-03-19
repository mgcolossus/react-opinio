import { Grid, IconButton, Input, Paper } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { observer } from "mobx-react-lite";
import React from "react";
import SurveyElementAnswerTemplate from "./SurveyElementAnswerTemplate";

function SurveyElement({ elementData, index, handleChangeElement, handleRemoveElement }) {
  return (
    <Grid item xs={12} key={elementData.elementId}>
      <Paper className="paper">
        <Grid container>
          <Grid item container justify="flex-end" xs={12}>
            {handleChangeElement ? (
              <IconButton onClick={() => handleChangeElement(index)}>
                <EditIcon fontSize="small" />
              </IconButton>
            ) : null}
            {handleRemoveElement ? (
              <IconButton onClick={() => handleRemoveElement(index)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <Input multiline fullWidth value={`${elementData.question}${elementData.required ? "*" : ""}`} />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <SurveyElementAnswerTemplate elementData={elementData} />
        </Grid>
      </Paper>
    </Grid>
  );
}

export default observer(SurveyElement);
