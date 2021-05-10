import { CircularProgress, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import SurveyAnswerItem from "./SurveyAnswersItem";

const useStyles = makeStyles((theme) => ({
  surveyAnswersLoadingCircle: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
}));

function SurveyAnswers({ surveyId }) {
  const [statsData, setStatsData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    async function getStatsData() {
      try {
        const response = await fetch(`https://myreactapp.site/api/surveys/stats/${surveyId}`, {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setStatsData(data);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(true);
        setLoading(false);
      }
    }
    getStatsData();
  }, [surveyId]);

  return (
    <>
      {loading ? (
        <div className={classes.surveyAnswersLoadingCircle}>
          <CircularProgress />
        </div>
      ) : error ? (
        <Typography>Произошла ошибка</Typography>
      ) : (
        <>
          {Object.keys(statsData.questionIds).map((key) => {
            return <SurveyAnswerItem key={key} answerData={statsData.questionIds[key]} passedCounter={statsData.passedCounter} />;
          })}
        </>
      )}
    </>
  );
}

export default SurveyAnswers;
