import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  noSurveyInstruction: {
    height: "calc(100vh - 160px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

function NoSurveyInstruction() {
  const classes = useStyles();
  return (
    <div className={classes.noSurveyInstruction}>
      <Typography variant="h5" align="center">
        Нажмите на опрос из списка опросов или создайте новый
      </Typography>
    </div>
  );
}

export default NoSurveyInstruction;
