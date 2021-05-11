import React, { useState } from "react";
import { Button, Grid, TextField, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { observer } from "mobx-react-lite";
import { v4 as uuidv4 } from "uuid";
import SurveyStore from "../../../stores/surveyDataStore";
import NewSurveyElements from "./NewSurveyElements";

const useStyles = makeStyles((theme) => ({
  titleInput: {
    fontSize: "36px",
    fontWeight: 700,
  },
  noteInput: {
    fontSize: "20px",
  },
}));

function NewSurvey(props) {
  const [newSurveyTitle, setNewSurveyTitle] = useState("");
  const [newSurveyNote, setNewSurveyNote] = useState("");
  const [newSurveyElements, setNewSurveyElements] = useState([]);
  const [changingElementIndex, setChangingElementIndex] = useState(null);

  const classes = useStyles();

  const saveSurvey = () => {
    const surveyListTitles = props.surveysData.map((survey) => survey.title);
    surveyListTitles.push(newSurveyTitle);
    const isNewSurveyTitleUnique = surveyListTitles.length === new Set(surveyListTitles).size;
    if (newSurveyTitle.trim() === "") {
      props.setError("Не введено название опроса");
    } else if (newSurveyElements.length === 0) {
      props.setError("Пустой опрос(в опросе нет вопросов)");
    } else if (props.surveysData.length !== 0 && !isNewSurveyTitleUnique) {
      props.setError("Опрос с таким названием уже существует. Дайте другое название");
    } else {
      props.setError("");
      SurveyStore.sendSurveyToServer({
        surveyId: uuidv4(),
        title: newSurveyTitle.trim(),
        elements: newSurveyElements,
        note: newSurveyNote.trim(),
      });

      setNewSurveyTitle("");
      setNewSurveyNote("");
      setNewSurveyElements([]);
      setChangingElementIndex(null);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={3} className="paper">
            <Grid item container spacing={2} xs={12}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  placeholder="Название опроса"
                  InputProps={{ className: classes.titleInput }}
                  value={newSurveyTitle}
                  onChange={(e) => setNewSurveyTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  InputProps={{ className: classes.noteInput }}
                  placeholder="Примечание"
                  value={newSurveyNote}
                  onChange={(e) => setNewSurveyNote(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">Ответ на вопросы с будет * обязателен</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <NewSurveyElements
          newSurveyElements={newSurveyElements}
          setNewSurveyElements={setNewSurveyElements}
          changingElementIndex={changingElementIndex}
          setChangingElementIndex={setChangingElementIndex}
          setError={props.setError}
        />
        <Grid item xs={12}>
          <Button color="primary" variant="contained" fullWidth onClick={saveSurvey}>
            Сохранить опрос
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default observer(NewSurvey);
