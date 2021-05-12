import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import SurveyAnswerItemAnswerTypeText from "./SurveyAnswerItemAnswerTypeText";
import SurveyAnswerItemAnswerTypeSelection from "./SurveyAnswerItemAnswerTypeSelection";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  titleTypography: {
    wordBreak: "break-all",
  },
}));

function getSurveyAnswerItemByTypeFromData(answerData) {
  switch (answerData.answerType) {
    case "text":
      return <SurveyAnswerItemAnswerTypeText answerData={answerData} />;
    case "oneSelection":
    case "manySelections":
      return <SurveyAnswerItemAnswerTypeSelection answerData={answerData} />;
    default:
      console.error("Unknown type of question");
      return <div>error</div>;
  }
}

function SurveyAnswerItem({ answerData, passedCounter }) {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <Paper className="paper">
        <Typography className={classes.titleTypography} variant="h6">
          {answerData.question}
        </Typography>
        {answerData.unanswered !== passedCounter ? (
          <>{getSurveyAnswerItemByTypeFromData(answerData)}</>
        ) : (
          <Typography variant="subtitle2">На этот вопрос ответов пока нет</Typography>
        )}
      </Paper>
    </Grid>
  );
}
export default SurveyAnswerItem;
