import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  questionTypography: {
    wordBreak: "break-all",
  },
}));

function SurveyFormTitle({ title }) {
  const classes = useStyles();
  return (
    <>
      <Grid item xs={12}>
        <Typography className={classes.titleTypography} variant="h4">
          {title}
        </Typography>
      </Grid>
    </>
  );
}

export default SurveyFormTitle;
