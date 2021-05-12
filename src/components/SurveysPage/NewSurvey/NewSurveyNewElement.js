import { Grid, Paper, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import NewSurveyNewElementMainButtons from "./NewSurveyNewElementMainButtons";
import SurveyElementAnswerParametersEditor from "./SurveyElementAnswerParametersEditor";
import SurveyElementAnswerTemplateEditor from "./SurveyElementAnswerTemplateEditor";

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

function NewSurveyNewElement({ setError, setNewSurveyElements }) {
  const ANSWER_TYPES_FOR_SELECT = ["Текстовое поле", "Один ответ из нескольких", "Несколько опций "];
  const ANSWER_TYPES_FOR_STATE = ["text", "oneSelection", "manySelections"];

  const [selectedTypeIndex, setSelectedTypeIndex] = useState(0);
  const [newElementQuestion, setNewElementQuestion] = useState("");
  const [newElementAnswerRequired, setNewElementAnswerRequired] = useState(false);
  const [newElementOtherOptionAllowed, setNewElementOtherOptionAllowed] = useState(false);
  const [newElementAnswerType, setNewElementAnswerType] = useState(ANSWER_TYPES_FOR_STATE[selectedTypeIndex]);
  const [newElementId, setNewElementId] = useState(uuidv4());
  const [newElementAnswerOptions, setNewElementAnswerOptions] = useState([]);

  const [currentFocusedInputIndex, setCurrentFocusedInputIndex] = useState();
  const createdInputRef = useRef();

  const classes = useStyles();

  useEffect(() => {
    if (createdInputRef.current) {
      createdInputRef.current.focus();
    }
  }, [currentFocusedInputIndex]);

  const changeAnswerType = (e) => {
    const selectedIndex = Number(e.target.value);
    if (selectedIndex <= ANSWER_TYPES_FOR_STATE.length - 1) {
      setSelectedTypeIndex(selectedIndex);
      setNewElementAnswerType(ANSWER_TYPES_FOR_STATE[selectedIndex]);
    } else {
      console.error("Error in changeAnswerType()");
    }
  };

  const changeQuestionText = (newText) => {
    setNewElementQuestion(newText);
  };

  const addOption = () => {
    setNewElementAnswerOptions((prev) => [...prev, ""]);
    setCurrentFocusedInputIndex(newElementAnswerOptions.length);
  };

  const changeOptionText = (newText, optionToChangeIndex) => {
    setNewElementAnswerOptions((prev) => {
      return prev.map((optionText, index) => {
        if (optionToChangeIndex === index) {
          return newText;
        }
        return optionText;
      });
    });
  };

  const removeOption = (optionIndex) => {
    setNewElementAnswerOptions((prev) => {
      return prev.filter((option, index) => index !== optionIndex);
    });
  };

  const changeAnswerRequired = () => {
    setNewElementAnswerRequired((prev) => !prev);
  };

  const changeOtherOptionAllowed = () => {
    setNewElementOtherOptionAllowed((prev) => !prev);
  };

  const addElementToSurvey = () => {
    if (newElementQuestion.trim() === "") {
      setError("Не введен вопрос");
    } else if (newElementAnswerType !== "text" && newElementAnswerOptions.length === 0) {
      setError("Не добавлены опции для ответа");
    } else if (
      newElementAnswerType !== "text" &&
      newElementAnswerOptions.filter((option) => option.trim() === "").length !== 0
    ) {
      setError(
        "Найдена пустая опция: уберите лишние пробелы в начале или конце опции, введите текст опции или удалите её"
      );
    } else if (
      newElementAnswerType !== "text" &&
      newElementAnswerOptions.length !== new Set(newElementAnswerOptions.map((option) => option.trim())).size
    ) {
      setError("Удалите повторяющиеся опции");
    } else {
      setError("");
      if (newElementAnswerType === "text") {
        setNewSurveyElements((prev) => [
          ...prev,
          {
            type: newElementAnswerType,
            required: newElementAnswerRequired,
            question: newElementQuestion.trim(),
            elementId: newElementId,
          },
        ]);
      } else {
        setNewSurveyElements((prev) => [
          ...prev,
          {
            type: newElementAnswerType,
            required: newElementAnswerRequired,
            question: newElementQuestion.trim(),
            elementId: newElementId,
            options: newElementAnswerOptions.map((option) => option.trim()),
            otherOptionAllowed: newElementOtherOptionAllowed,
          },
        ]);
      }

      setNewElementQuestion("");
      setNewElementAnswerOptions([]);
      setNewElementId(uuidv4());
    }
  };

  const onOptionEnterPress = (index) => {
    setNewElementAnswerOptions((prev) => {
      const newArr = [...prev];
      newArr.splice(index + 1, 0, "");
      return newArr;
    });
    setCurrentFocusedInputIndex(index + 1);
  };

  return (
    <Grid item xs={12}>
      <Paper className="paper survey-element">
        <Grid container className={classes["MuiGrid-spacing-xs-2"]} spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              label="Текст вопроса"
              variant="outlined"
              value={newElementQuestion}
              onChange={(e) => changeQuestionText(e.target.value)}
            />
          </Grid>
          <SurveyElementAnswerParametersEditor
            selectedTypeIndex={selectedTypeIndex}
            elementAnswerRequired={newElementAnswerRequired}
            elementOtherOptionAllowed={newElementOtherOptionAllowed}
            ANSWER_TYPES_FOR_SELECT={ANSWER_TYPES_FOR_SELECT}
            changeAnswerType={changeAnswerType}
            changeAnswerRequired={changeAnswerRequired}
            changeOtherOptionAllowed={changeOtherOptionAllowed}
          />
          <SurveyElementAnswerTemplateEditor
            type={selectedTypeIndex}
            answerOptions={newElementAnswerOptions}
            otherOptionAllowed={newElementOtherOptionAllowed}
            changeOptionText={changeOptionText}
            removeOption={removeOption}
            onOptionEnterPress={onOptionEnterPress}
            currentFocusedInputIndex={currentFocusedInputIndex}
            setCurrentFocusedInputIndex={setCurrentFocusedInputIndex}
            createdInputRef={createdInputRef}
          />
          <NewSurveyNewElementMainButtons
            type={selectedTypeIndex}
            addOption={addOption}
            addElementToSurvey={addElementToSurvey}
          />
        </Grid>
      </Paper>
    </Grid>
  );
}

export default NewSurveyNewElement;
