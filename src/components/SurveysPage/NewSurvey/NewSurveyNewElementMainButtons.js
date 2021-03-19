import React from "react";
import { Button, Grid, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

function NewSurveyNewElementMainButtons({ type, addOption, addElementToSurvey }) {
  if (![0,1,2].includes(type)) {
    throw Error(`Unexpected "type" prop value: ${type}`)
  }
  switch (type) {
    case 0: //text
      return (
        <Grid item container justify="flex-end" xs={12}>
          <Fab size="small" color="primary" onClick={addElementToSurvey}>
            <AddIcon />
          </Fab>
        </Grid>
      );
    case 1: //oneSelection
    case 2: //manySelections
      return (
        <Grid item container justify="space-between" alignItems="center" xs={12}>
          <Button variant="contained" onClick={addOption}>
            Добавить опцию
          </Button>
          <Fab size="small" color="primary" onClick={addElementToSurvey}>
            <AddIcon />
          </Fab>
        </Grid>
      );
    default:
      return <div>{`Unexpected "type" prop value: ${type}`}</div>
  }
}

export default NewSurveyNewElementMainButtons;
