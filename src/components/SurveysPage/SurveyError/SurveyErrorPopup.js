import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSurveyError } from "../../../contexts/SurveyErrorContext";

const useStyles = makeStyles((theme) => ({
  error: {
    position: "fixed",
    zIndex: "1100",
    width: "100%",
    minHeight: "64px",
    color: "white",
    backgroundColor: "rgba(255, 0, 0, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    right: "0",
    top: "56px",
    [theme.breakpoints.up("sm")]: {
      top: "64px",
    },
  },
}));

function ErrorPopup() {
  const {error} = useSurveyError();
  const classes = useStyles();
  return (
    <>
      {error ? (
        <div className={classes.error}>
          <Typography variant="h5">{error}</Typography>
        </div>
      ) : null}
    </>
  );
}

export default ErrorPopup;