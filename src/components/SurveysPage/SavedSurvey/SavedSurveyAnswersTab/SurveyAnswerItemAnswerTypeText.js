import React, { useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { Input, Grid, Paper } from "@material-ui/core";

function SurveyAnswerItemAnswerTypeText({ answerData }) {
  const answersPerPage = 5;
  const [answersToShow, setAnswersToShow] = useState(answerData.answers.slice(0, answersPerPage));
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = Math.ceil(answerData.answers.length / answersPerPage);

  const onPageChange = (event, number) => {
    setCurrentPage(number);
    setAnswersToShow(
      answerData.answers.slice((number - 1) * answersPerPage, (number - 1) * answersPerPage + answersPerPage)
    );
  };

  return (
    <Paper className="paper answer-paper" variant="outlined">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {answersToShow.map((answer, index) => {
            return <Input fullWidth readOnly multiline value={answer} key={index} rows={4} />;
          })}
        </Grid>
        <Grid item xs={12}>
          <Pagination count={pageCount} page={currentPage} onChange={onPageChange} />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default SurveyAnswerItemAnswerTypeText;
