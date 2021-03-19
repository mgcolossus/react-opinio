import React from "react";
import { Typography } from "@material-ui/core";

function NoSurveyInstruction() {
  return (
    <div className="no-survey-instruction">
      <Typography variant="h5" align="center">
        Нажмите на опрос из списка опросов или создайте новый
      </Typography>
    </div>
  );
}

export default NoSurveyInstruction;
