import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Input,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  optionLabel: {
    overflowWrap: "break-word",
    wordBreak: "break-all",
  },
}));

function SurveyElementTypeTextAnswerTemplate(props) {
  return (
    <FormControl fullWidth>
      <Input multiline disabled placeholder="Здесь будет ответ пользователя" />
    </FormControl>
  );
}

function SurveyElementTypeOneSelectionAnswerTemplate({ elementData, classes }) {
  return (
    <FormControl>
      <RadioGroup>
        {elementData.options &&
          elementData.options.map((optionText, index) => {
            return (
              <FormControlLabel
                key={optionText + index}
                value={optionText}
                control={<Radio color="primary" />}
                label={
                  <Typography className={classes.optionLabel} variant="body1">
                    {optionText}
                  </Typography>
                }
              />
            );
          })}
        {elementData.otherOptionAllowed ? (
          <FormControlLabel
            value={""}
            control={<Radio color="primary" />}
            label={
              <div>
                <TextField value={""} placeholder="Другое" />
              </div>
            }
          />
        ) : null}
      </RadioGroup>
    </FormControl>
  );
}

function SurveyElementTypeManySelectionsAnswerTemplate({ elementData, classes }) {
  return (
    <FormControl>
      <FormGroup>
        {elementData.options &&
          elementData.options.map((optionText, index) => {
            return (
              <FormControlLabel
                key={optionText + index}
                control={<Checkbox color="primary" />}
                label={
                  <Typography className={classes.optionLabel} variant="body1">
                    {optionText}
                  </Typography>
                }
              />
            );
          })}
        {elementData.otherOptionAllowed ? (
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label={
              <div>
                <TextField value={""} placeholder="Другое" />
              </div>
            }
          />
        ) : null}
      </FormGroup>
    </FormControl>
  );
}

function SurveyElementAnswerTemplate({ elementData }) {
  const classes = useStyles();

  switch (elementData.type) {
    case "text":
      return <SurveyElementTypeTextAnswerTemplate />;
    case "oneSelection":
      return <SurveyElementTypeOneSelectionAnswerTemplate elementData={elementData} classes={classes} />;
    case "manySelections":
      return <SurveyElementTypeManySelectionsAnswerTemplate elementData={elementData} classes={classes} />;
    default:
      console.error("Error in getPreviousSurveyElementsAnswerTemplate()");
      return <div>Error in getPreviousSurveyElementsAnswerTemplate</div>;
  }
}

export default SurveyElementAnswerTemplate;
