import React from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Input,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ClearIcon from "@material-ui/icons/Clear";
import SurveyElementOtherOption from "../../shared/SurveyElementOtherOption";

const useStyles = makeStyles((theme) => ({
  selectFormControl: {
    minWidth: 225,
  },
  "@media (max-width: 330px)": {
    "MuiGrid-spacing-xs-2": {
      "& > .selectFormControlGridItem": {
        padding: 0,
      },
    },
  },
  optionInputFormControl: {
    width: "100%",
    "& .optionInputFormGroup span:nth-child(2)": {
      width: "100%",
      "& .optionInputTextField": {
        flex: 1,
      },
    },
  },
}));

function SurveyElementAnswerTemplateEditor({
  type,
  answerOptions,
  otherOptionAllowed,
  changeOptionText,
  removeOption,
  onOptionEnterPress,
  currentFocusedInputIndex,
  createdInputRef,
}) {
  const classes = useStyles();
  switch (type) {
    case 0: //text
      return (
        <Grid item xs={12}>
          <FormControl fullWidth>
            <Input disabled placeholder="Здесь будет ответ пользователя" />
          </FormControl>
        </Grid>
      );
    case 1: //oneSelection
      return (
        <Grid item xs={12}>
          <FormControl className={classes.optionInputFormControl}>
            <RadioGroup className="optionInputFormGroup" defaultValue={null}>
              {answerOptions &&
                answerOptions.map((optionText, index) => {
                  return (
                    <FormControlLabel
                      disabled
                      key={index}
                      control={<Radio />}
                      label={
                        <div style={{ display: "flex" }}>
                          <TextField
                            className="optionInputTextField"
                            placeholder="Текст опции"
                            inputRef={currentFocusedInputIndex === index ? createdInputRef : null}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                onOptionEnterPress(index);
                              }
                            }}
                            value={optionText}
                            fullWidth
                            onChange={(e) => changeOptionText(e.target.value, index)}
                          />
                          <IconButton aria-label="delete" onClick={() => removeOption(index)}>
                            <ClearIcon fontSize="inherit" />
                          </IconButton>
                        </div>
                      }
                    />
                  );
                })}
              {otherOptionAllowed ? <SurveyElementOtherOption type={type} /> : null}
            </RadioGroup>
          </FormControl>
        </Grid>
      );
    case 2: //manySelections
      return (
        <Grid item xs={12}>
          <FormControl className={classes.optionInputFormControl}>
            <RadioGroup className="optionInputFormGroup" defaultValue={null}>
              {answerOptions &&
                answerOptions.map((optionText, index) => {
                  return (
                    <FormControlLabel
                      disabled
                      key={index}
                      control={<Checkbox />}
                      label={
                        <div style={{ display: "flex" }}>
                          <TextField
                            inputRef={currentFocusedInputIndex === index ? createdInputRef : null}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                onOptionEnterPress(index);
                              }
                            }}
                            className="optionInputTextField"
                            placeholder="Текст опции"
                            value={optionText}
                            fullWidth
                            onChange={(e) => changeOptionText(e.target.value, index)}
                          />
                          <IconButton aria-label="delete" onClick={() => removeOption(index)}>
                            <ClearIcon fontSize="inherit" />
                          </IconButton>
                        </div>
                      }
                    />
                  );
                })}
              {otherOptionAllowed ? <SurveyElementOtherOption type={type} /> : null}
            </RadioGroup>
          </FormControl>
        </Grid>
      );
    default:
      return <div>none</div>;
  }
}

export default SurveyElementAnswerTemplateEditor;
