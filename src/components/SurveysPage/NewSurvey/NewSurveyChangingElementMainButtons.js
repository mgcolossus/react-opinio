import React from "react";
import {
  Button,
  Grid,
  Fab,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  [theme.breakpoints.up("sm")]: {
    resetChangesButton: {
      margin: "0 10px 0 0",
    },
    saveChangesButton: {
      margin: "0 0 0 10px",
    },
  },
}));

function NewSurveyChangingElementMainButtons({ type, addOption, resetChanges, saveChanges }) {
  const classes = useStyles();
  const isSmBreakpoint = useMediaQuery("(max-width: 600px)");

  if (![0, 1, 2].includes(type)) {
    throw Error(`Unexpected "type" prop value: ${type}`);
  }
  switch (type) {
    case 0: //text
      return (
        <>
          {isSmBreakpoint ? (
            <>
              <Grid item justify={"center"} sm={10} xs={12}>
                <Button variant="contained" color="primary" fullWidth={true} onClick={resetChanges}>
                  Сброс изменений
                </Button>
              </Grid>
              <Grid item container justify="flex-end" xs={12}>
                <Fab size="small" color="primary" onClick={saveChanges}>
                  <CheckIcon />
                </Fab>
              </Grid>
            </>
          ) : (
            <Grid item justify="flex-end" alignItems="center" container xs={12}>
              <Button className={classes.resetChangesButton} variant="contained" color="primary" onClick={resetChanges}>
                Сброс изменений
              </Button>
              <Fab className={classes.saveChangesButton} size="small" color="primary" onClick={saveChanges}>
                <CheckIcon />
              </Fab>
            </Grid>
          )}
        </>
      );
    case 1:
    case 2:
      return (
        <>
          {isSmBreakpoint ? (
            <>
              <Grid item xs={12}>
                <Button variant="contained" fullWidth onClick={addOption}>
                  Добавить опцию
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  className={classes.resetChangesButton}
                  variant="contained"
                  color="primary"
                  fullWidth={true}
                  onClick={resetChanges}>
                  Сброс изменений
                </Button>
              </Grid>
              <Grid item container xs={12} justify="flex-end">
                <Fab className={classes.saveChangesButton} color="primary" onClick={saveChanges}>
                  <CheckIcon />
                </Fab>
              </Grid>
            </>
          ) : (
            <Grid item container alignItems="center" xs={12}>
              <Grid item container justify="flex-start" sm={5}>
                <Button variant="contained" onClick={addOption}>
                  Добавить опцию
                </Button>
              </Grid>
              <Grid item container justify="flex-end" alignItems="center" sm={7}>
                <Button
                  className={classes.resetChangesButton}
                  variant="contained"
                  color="primary"
                  onClick={resetChanges}>
                  Сброс изменений
                </Button>
                <Fab className={classes.saveChangesButton} size="small" color="primary" onClick={saveChanges}>
                  <CheckIcon />
                </Fab>
              </Grid>
            </Grid>
          )}
        </>
      );
    default:
      return <div>error</div>
  }
}

export default NewSurveyChangingElementMainButtons;
