import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core";
import SurveyFormAnswerTemplate from "./SurveyFormAnswerTemplate";

const useStyles = makeStyles((theme) => ({
  questionTypography: {
    wordBreak: "break-all",
  },
}));

function SurveyFormElements({
  surveyData,
  getValues,
  errors,
  register,
  defaultValues,
  setValue,
  setDefaultValues,
  control,
  checkboxOtherOptionInputValues,
  setCheckboxOtherOptionInputValues,
}) {
  const classes = useStyles();
  return (
    <>
      {surveyData &&
        surveyData.elements.map((elementData) => {
          return (
            <Grid item xs={12} key={elementData.elementId}>
              <Paper elevation={4} className="paper">
                <Typography className={classes.questionTypography} variant="h6">{`${elementData.question}${
                  elementData.required ? "*" : ""
                }`}</Typography>
                <SurveyFormAnswerTemplate
                  elementData={elementData}
                  surveyData={surveyData}
                  getValues={getValues}
                  errors={errors}
                  register={register}
                  defaultValues={defaultValues}
                  setValue={setValue}
                  setDefaultValues={setDefaultValues}
                  control={control}
                  checkboxOtherOptionInputValues={checkboxOtherOptionInputValues}
                  setCheckboxOtherOptionInputValues={setCheckboxOtherOptionInputValues}
                />
              </Paper>
            </Grid>
          );
        })}
    </>
  );
}

export default SurveyFormElements;
