import React from "react";
import { Grid, Paper, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import surveyCreation from "../../assets/MainPage/surveyCreation.gif";
import surveyLink from "../../assets/MainPage/surveyLink.gif";
import surveyAnswers from "../../assets/MainPage/surveyAnswers.gif";
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  gifImage: {
    maxWidth: "100%",
    maxHeight: "100%",
    display: "block",
    margin: "0 auto",
  },
  description: {
    paddingLeft: "10px",
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

function MainPage() {
  const classes = useStyles();
  return (
    <Grid container alignItems="center" justify="center" spacing={2}>
      <Grid container item md={5} xs={12} spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Opinio - приложение для создания опросов
          </Typography>
        </Grid>
        <Grid item xs={12} container justify="center">
          <Button component={Link} to="/login" variant="contained" color="primary">
            Начать пользоваться
          </Button>
        </Grid>
      </Grid>
      <Grid container item md={6} xs={12} spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={2} className={classes.paper}>
            <Grid container spacing={2} alignItems="center">
              <Grid item lg={4} xs={12}>
                <Typography className={classes.description} variant="h6">
                  Создавайте опросы
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <img className={classes.gifImage} src={surveyCreation} alt="creation" />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={2} className={classes.paper}>
            <Grid container spacing={2} alignItems="center">
              <Grid item lg={4} xs={12}>
                <Typography className={classes.description} variant="h6">
                  Отправляйте ссылку на опрос другим людям
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <img className={classes.gifImage} src={surveyLink} alt="link" />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={2} className={classes.paper}>
            <Grid container spacing={2} alignItems="center">
              <Grid item lg={4} xs={12}>
                <Typography className={classes.description} variant="h6">
                  Смотрите результаты опросов
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <img className={classes.gifImage} src={surveyAnswers} alt="answers" />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MainPage;
