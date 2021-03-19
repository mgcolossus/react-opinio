import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  notFoundPageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '98vw',
    height: '98vh',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

function NotFoundPage() {
  const classes = useStyles();
  return <div className={classes.notFoundPageWrapper}>
    <Typography variant="h3">404</Typography>
    <Typography variant="h4">Страница не найдена</Typography>
  </div>;
}

export default NotFoundPage;
