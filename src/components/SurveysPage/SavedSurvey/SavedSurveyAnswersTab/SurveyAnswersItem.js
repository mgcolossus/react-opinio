import React from 'react';
import { Grid, Paper, Typography, InputBase } from "@material-ui/core";
import SurveyAnswerItemAnswerTypeText from "./SurveyAnswerItemAnswerTypeText"
import SurveyAnswerItemAnswerTypeSelection from "./SurveyAnswerItemAnswerTypeSelection"


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
  return (
    <Grid item xs={12}>
      <Paper className="paper">
        <InputBase className="survey-question-input" fullWidth multiline value={answerData.question} />
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