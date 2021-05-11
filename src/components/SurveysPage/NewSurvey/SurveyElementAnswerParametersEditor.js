import React from "react";
import { Grid, Switch, FormControl, FormControlLabel, InputLabel, Select, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
}));

function SurveyElementAnswerParametersEditor({
  selectedTypeIndex,
  elementAnswerRequired,
  elementOtherOptionAllowed,
  ANSWER_TYPES_FOR_SELECT,
  changeAnswerType,
  changeAnswerRequired,
  changeOtherOptionAllowed,
}) {
  const classes = useStyles();
  return (
    <>
      <Grid item className={"selectFormControlGridItem"} sm={7}>
        <FormControl className={classes.selectFormControl}>
          <InputLabel>Тип ответа</InputLabel>
          <Select onChange={changeAnswerType} value={selectedTypeIndex}>
            {ANSWER_TYPES_FOR_SELECT.map((type, index) => (
              <MenuItem key={type + index} value={index}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item container sm={5}>
        <Grid item container xs={12}>
          <FormControlLabel
            label="Ответ обязателен"
            control={
              <Switch
                checked={elementAnswerRequired}
                color="primary"
                onChange={() => {
                  changeAnswerRequired();
                }}
              />
            }
          />
        </Grid>
        {selectedTypeIndex === 1 || selectedTypeIndex === 2 ? (
          <Grid item container xs={12}>
            <FormControlLabel
              label={`Добавить опцию "Другое"`}
              control={
                <Switch
                  checked={elementOtherOptionAllowed}
                  color="primary"
                  onChange={() => {
                    changeOtherOptionAllowed();
                  }}
                />
              }
            />
          </Grid>
        ) : null}
      </Grid>
    </>
  );
}

export default SurveyElementAnswerParametersEditor;
