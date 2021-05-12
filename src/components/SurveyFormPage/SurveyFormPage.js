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
import SurveyFormTitle from "./SurveyFormTitle";
import SurveyFormNote from "./SurveyFormNote";
import SurveyFormFields from "./SurveyFormFields";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
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

  return (
    <Grid container spacing={2} justify="center">
      {successfullySent ? (
        <Grid item xs={12}>
          <Typography variant="h3" align="center">
            Ваши ответы отправлены <br /> Спасибо за участие в опросе.
          </Typography>
        </Grid>
      ) : (
        <>
          <Grid item xs={12} sm={10} md={8}>
            <Paper className="paper" elevation={4}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <SurveyFormTitle title={surveyData.title} />
                </Grid>
                {surveyData.note ? (
                  <Grid item xs={12}>
                    <SurveyFormNote note={surveyData.note} />
                  </Grid>
                ) : null}
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={10} md={8}>
            <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <SurveyFormFields
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
                <Grid item xs={12}>
                  <Button disabled={loading} fullWidth type="submit" variant="contained" color="primary">
                    Отправить
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </>
      )}
    </Grid>
  );
}
