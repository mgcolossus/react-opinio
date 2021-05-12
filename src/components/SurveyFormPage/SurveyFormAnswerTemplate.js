import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, Radio, RadioGroup, TextField } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Controller } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  otherOptionInputFormControl: {
    width: "100%",
    "& .otherOptionInputFormGroup span:nth-child(2)": {
      width: "100%",
      "& .otherOptionInputTextField": {
        flex: 1,
      },
    },
  },
}));

function SurveyFormAnswerTemplate({
  elementData,
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

  const caseInsensitiveEquals = (a, b) => {
    return typeof a === "string" && typeof b === "string"
      ? a.localeCompare(b, undefined, { sensitivity: "accent" }) === 0
      : a === b;
  };

  const atLeastOne = (name) => {
    return getValues(name).length ? true : "Должна быть выбрана хотя бы одна опция";
  };

  switch (elementData.type) {
    case "text": {
      const registerOptions = {};
      if (elementData.required) {
        registerOptions.required = "Ответ обязателен";
        registerOptions.validate = (value) => value.trim() !== "" || "Ответ состоит только из пробелов";
      }
      return (
        <TextField
          error={!!errors[elementData.elementId]}
          helperText={errors[elementData.elementId] ? errors[elementData.elementId].message : null}
          fullWidth
          multiline
          name={elementData.elementId}
          inputRef={register(registerOptions)}
        />
      );
    }
    case "oneSelection": {
      const rulesOptions = {};
      rulesOptions.validate = {};
      if (
        elementData.otherOptionAllowed &&
        defaultValues[elementData.elementId] &&
        defaultValues[elementData.elementId] !== ""
      ) {
        rulesOptions.validate.emptyOption = (value) => value.trim() !== "" || "Введенная опция пуста";
        rulesOptions.validate.optionsMatched = (value) =>
          !elementData.options.some((option) => caseInsensitiveEquals(option, value.trim())) ||
          "Введенная опция уже есть среди доступных";
      }
      if (elementData.required) {
        rulesOptions.required = "Ответ обязателен";
      }
      return (
        <FormControl className={classes.otherOptionInputFormControl} error={!!errors[elementData.elementId]}>
          <Controller
            as={
              <RadioGroup className={"otherOptionInputFormGroup"}>
                {elementData.options.map((option, index) => {
                  return (
                    <FormControlLabel key={index} value={option} control={<Radio color="primary" />} label={option} />
                  );
                })}
                {elementData.otherOptionAllowed ? (
                  <FormControlLabel
                    value={defaultValues[elementData.elementId]}
                    control={<Radio disabled={defaultValues[elementData.elementId] === ""} color="primary" />}
                    label={
                      <div style={{ display: "flex" }}>
                        <TextField
                          placeholder="Другое"
                          className="otherOptionInputTextField"
                          value={defaultValues[elementData.elementId]}
                          onChange={(e) => {
                            setValue(elementData.elementId, e.target.value);
                            setDefaultValues((prev) => {
                              return { ...prev, [elementData.elementId]: e.target.value };
                            });
                          }}
                        />
                      </div>
                    }
                  />
                ) : null}
              </RadioGroup>
            }
            name={elementData.elementId}
            control={control}
            rules={rulesOptions}
          />
          {errors[elementData.elementId] ? (
            <FormHelperText>{errors[elementData.elementId].message}</FormHelperText>
          ) : null}
        </FormControl>
      );
    }
    case "manySelections": {
      const registerOptions = {};
      registerOptions.validate = {};
      if (
        elementData.otherOptionAllowed &&
        checkboxOtherOptionInputValues[elementData.elementId] &&
        checkboxOtherOptionInputValues[elementData.elementId] !== ""
      ) {
        const otherOptionInputValue = checkboxOtherOptionInputValues[elementData.elementId];

        registerOptions.validate.emptyOptionSelected = (selectedOptions) =>
          !selectedOptions.some((option) => option.trim() === "") || "Выбрана пустая опция";

        registerOptions.validate.optionsMatched = (selectedOptions) => {
          const matched = selectedOptions.filter((option) =>
            caseInsensitiveEquals(option, otherOptionInputValue.trim())
          );
          return matched.length < 2 || "Введенная опция уже есть среди доступных";
        };
      }
      if (elementData.required) {
        registerOptions.validate.atLeastOne = () => atLeastOne(elementData.elementId);
      }
      return (
        <FormControl className={classes.otherOptionInputFormControl} error={!!errors[elementData.elementId]}>
          <FormGroup className="otherOptionInputFormGroup">
            {elementData.options.map((option, index) => {
              return (
                <FormControlLabel
                  key={option}
                  control={
                    <Checkbox
                      color="primary"
                      name={elementData.elementId}
                      value={option}
                      inputRef={register(registerOptions)}
                    />
                  }
                  label={option}
                />
              );
            })}
            {elementData.otherOptionAllowed ? (
              <FormControlLabel
                disabled={checkboxOtherOptionInputValues[elementData.elementId] === ""}
                value={checkboxOtherOptionInputValues[elementData.elementId]}
                control={<Checkbox color="primary" inputRef={register(registerOptions)} name={elementData.elementId} />}
                label={
                  <div style={{ display: "flex" }}>
                    <TextField
                      className="otherOptionInputTextField"
                      placeholder="Другое"
                      value={checkboxOtherOptionInputValues[elementData.elementId]}
                      onChange={(e) =>
                        setCheckboxOtherOptionInputValues((prev) => ({
                          ...prev,
                          [elementData.elementId]: e.target.value,
                        }))
                      }
                      name={elementData.elementId}
                    />
                  </div>
                }
              />
            ) : null}
          </FormGroup>
          {errors[elementData.elementId] ? (
            <FormHelperText>{errors[elementData.elementId].message}</FormHelperText>
          ) : null}
        </FormControl>
      );
    }
    default:
      console.error("element type error");
  }
}

export default SurveyFormAnswerTemplate;
