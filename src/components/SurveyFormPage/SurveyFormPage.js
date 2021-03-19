import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  InputBase,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

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
  surveyLoadError: {
    width: "98vw",
    height: "98vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  surveyLoadCircle: {
    width: "98vw",
    height: "98vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function SurveyUserFormLoader(props) {
  const { surveyLinkToken } = useParams();
  const [surveyData, setSurveyData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [defaultValues, setDefaultValues] = useState();
  const [checkboxOtherOptionInputValues, setCheckboxOtherOptionInputValues] = useState();
  const classes = useStyles();

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(`https://myreactapp.site/api/surveys/form/${surveyLinkToken}`);
        if (response.ok) {
          const data = await response.json();
          const extractedDefaultValues = {};
          const otherOptionInputValues = {};
          data.elements.forEach((el) => {
            switch (el.type) {
              case "text":
                extractedDefaultValues[el.elementId] = "";
                break;
              case "oneSelection":
                extractedDefaultValues[el.elementId] = "";
                break;
              case "manySelections":
                extractedDefaultValues[el.elementId] = false;
                otherOptionInputValues[el.elementId] = "";
                break;
              default:
                console.error("unknown type");
            }
          });
          setDefaultValues(extractedDefaultValues);
          setCheckboxOtherOptionInputValues(otherOptionInputValues);
          setSurveyData(data);
          setLoading(false);
        } else {
          if (response.status === 404) {
            setError("Опрос не найден");
          } else {
            setError("Возникла ошибка");
          }
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);

  return (
    <>
      {loading ? (
        <div className={classes.surveyLoadCircle}>
          <CircularProgress />
        </div>
      ) : error ? (
        <div className={classes.surveyLoadError}>
          <Typography>{error}</Typography>
        </div>
      ) : (
        <SurveyUserForm
          surveyData={surveyData}
          defaultValues={defaultValues}
          setDefaultValues={setDefaultValues}
          checkboxOtherOptionInputValues={checkboxOtherOptionInputValues}
          setCheckboxOtherOptionInputValues={setCheckboxOtherOptionInputValues}
          surveyLinkToken={surveyLinkToken}
        />
      )}
    </>
  );
}

function SurveyUserForm({
  surveyData,
  surveyLinkToken,
  defaultValues,
  setDefaultValues,
  checkboxOtherOptionInputValues,
  setCheckboxOtherOptionInputValues,
}) {
  const { handleSubmit, register, setValue, errors, control, getValues } = useForm({ defaultValues });
  const [loading, setLoading] = useState(false);
  const [successfullySent, setSuccessfullySent] = useState();
  const classes = useStyles();

  async function onSubmit(data) {
    try {
      setLoading(true);
      const response = await fetch(`https://myreactapp.site/api/surveys/form/${surveyLinkToken}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setSuccessfullySent(true);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  const caseInsensitiveEquals = (a, b) => {
    return typeof a === "string" && typeof b === "string"
      ? a.localeCompare(b, undefined, { sensitivity: "accent" }) === 0
      : a === b;
  };

  const atLeastOne = (name) => {
    return getValues(name).length ? true : "Должна быть выбрана хотя бы одна опция";
  };

  function answerTemplate(elementData) {
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
                  control={
                    <Checkbox color="primary" inputRef={register(registerOptions)} name={elementData.elementId} />
                  }
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

  return (
    <Grid container spacing={2} justify="center">
      {successfullySent ? (
        <Grid item xs={12}>
          <Typography variant="h3" align="center">
            Ваши ответы отправлены <br /> Спасибо за участие в опросе.
          </Typography>
        </Grid>
      ) : (
        <Grid item xs={12} sm={10} md={8}>
          <Paper className="paper" elevation={4}>
            {surveyData.note ? (
              <div className="survey-form-description">
                <InputBase readOnly fullWidth multiline value={surveyData.note} />
              </div>
            ) : null}
            <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                {surveyData &&
                  surveyData.elements.map((elementData) => {
                    return (
                      <Grid item xs={12} key={elementData.elementId}>
                        <Paper elevation={4} className="paper">
                          <InputBase
                            className="survey-question-input"
                            readOnly
                            fullWidth
                            multiline
                            value={`${elementData.question}${elementData.required ? "*" : ""}`}
                          />
                          {answerTemplate(elementData)}
                        </Paper>
                      </Grid>
                    );
                  })}
                <Grid item xs={12}>
                  <Button disabled={loading} fullWidth type="submit" variant="contained" color="primary">
                    Отправить
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      )}
    </Grid>
  );
}
