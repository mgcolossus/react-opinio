import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  noteTypography: {
    wordBreak: "break-all",
  },
}));

function SurveyFormNote({ note }) {
  const classes = useStyles();
  return (
    <>
      <Grid item xs={12}>
        <Typography className={classes.noteTypography} variant="h5">
          {note}
        </Typography>
      </Grid>
    </>
  );
}

export default SurveyFormNote;
