import React, { useState, useEffect, useRef } from "react";
import { Grid, Paper, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NewSurveyChangingElementMainButtons from "./NewSurveyChangingElementMainButtons";
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
  [theme.breakpoints.up("sm")]: {
    resetChangesButton: {
      margin: "0 10px 0 0",
    },
    applyChangesButton: {
      margin: "0 0 0 10px",
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

function NewSurveyChangingElement({
  setNewSurveyElements,
  changingElementIndex,
  setChangingElementIndex,
  setError,
  elementData,
}) {
  const ANSWER_TYPES_FOR_SELECT = ["Текстовое поле", "Один ответ из нескольких", "Несколько опций "];
  const ANSWER_TYPES_FOR_STATE = ["text", "oneSelection", "manySelections"];

  const [selectedTypeIndex, setSelectedTypeIndex] = useState(ANSWER_TYPES_FOR_STATE.indexOf(elementData.type));
  const [changingElementQuestion, setChangingElementQuestion] = useState(elementData.question);
  const [changingElementAnswerRequired, setChangingElementAnswerRequired] = useState(elementData.required);
  const [changingElementOtherOptionAllowed, setChangingElementOtherOptionAllowed] = useState(
    elementData.otherOptionAllowed || false
  );
  const [changingElementAnswerType, setChangingElementAnswerType] = useState(ANSWER_TYPES_FOR_STATE[selectedTypeIndex]);
  const [changingElementAnswerOptions, setChangingElementAnswerOptions] = useState(elementData.options || []);

  const [currentFocusedInputIndex, setCurrentFocusedInputIndex] = useState();
  const createdInputRef = useRef();

  useEffect(() => {
    if (createdInputRef.current) {
      createdInputRef.current.focus();
    }
  }, [currentFocusedInputIndex]);

  const classes = useStyles();

  const changeAnswerType = (e) => {
    const selectedIndex = Number(e.target.value);
    if (selectedIndex <= ANSWER_TYPES_FOR_STATE.length - 1) {
      setSelectedTypeIndex(selectedIndex);
      setChangingElementAnswerType(ANSWER_TYPES_FOR_STATE[selectedIndex]);
    } else {
      console.error("Error in changeAnswerType()");
    }
  };

  const changeAnswerRequired = () => {
    setChangingElementAnswerRequired((prev) => !prev);
  };

  const changeOtherOptionAllowed = () => {
    setChangingElementOtherOptionAllowed((prev) => !prev);
  };

  const addOption = () => {
    setChangingElementAnswerOptions((prev) => [...prev, ""]);
    setCurrentFocusedInputIndex(changingElementAnswerOptions.length);
  };

  const changeOptionText = (newText, optionToChangeIndex) => {
    setChangingElementAnswerOptions((prev) => {
      return prev.map((optionText, index) => {
        if (optionToChangeIndex === index) {
          return newText;
        }
        return optionText;
      });
    });
  };

  const changeQuestionText = (newText) => {
    setChangingElementQuestion(newText);
  };

  const removeOption = (optionIndex) => {
    setChangingElementAnswerOptions((prev) => {
      return prev.filter((option, index) => index !== optionIndex);
    });
  };

  const resetChanges = () => {
    setSelectedTypeIndex(ANSWER_TYPES_FOR_STATE.indexOf(elementData.type));
    setChangingElementQuestion(elementData.question);
    setChangingElementAnswerRequired(elementData.required);
    setChangingElementOtherOptionAllowed(elementData.otherOptionAllowed || false);
    setChangingElementAnswerType(ANSWER_TYPES_FOR_STATE[ANSWER_TYPES_FOR_STATE.indexOf(elementData.type)]);
    setChangingElementAnswerOptions(elementData.options || []);
  };

  const saveChangedSurveyElement = () => {
    if (changingElementQuestion.trim() === "") {
      setError("Не введен вопрос в изменяемом элементе опроса");
    } else if (changingElementAnswerType !== "text" && changingElementAnswerOptions.length === 0) {
      setError("Не добавлены опции для ответа в изменяемом элементе опроса");
    } else if (
      changingElementAnswerType !== "text" &&
      changingElementAnswerOptions.filter((option) => option.trim() === "").length !== 0
    ) {
      setError(
        "Найдена пустая опция в изменяемом элементе: уберите лишние пробелы в начале или конце опции, введите текст опции или удалите её"
      );
    } else if (
      changingElementAnswerType !== "text" &&
      changingElementAnswerOptions.length !== new Set(changingElementAnswerOptions.map((option) => option.trim())).size
    ) {
      setError("Удалите повторяющиеся опции в изменяемом элементе опроса");
    } else {
      setError("");
      if (changingElementAnswerType === "text") {
        setNewSurveyElements((prev) => {
          const changedSurveyElements = [...prev];
          changedSurveyElements.splice(changingElementIndex, 1, {
            type: changingElementAnswerType,
            required: changingElementAnswerRequired,
            question: changingElementQuestion.trim(),
            elementId: elementData.elementId,
          });
          return changedSurveyElements;
        });
      } else {
        setNewSurveyElements((prev) => {
          const changedSurveyElements = [...prev];
          changedSurveyElements.splice(changingElementIndex, 1, {
            type: changingElementAnswerType,
            required: changingElementAnswerRequired,
            question: changingElementQuestion.trim(),
            elementId: elementData.elementId,
            options: changingElementAnswerOptions.map((option) => option.trim()),
            otherOptionAllowed: changingElementOtherOptionAllowed,
          });
          return changedSurveyElements;
        });
      }
      setChangingElementIndex(null);
      setChangingElementQuestion("");
      setChangingElementAnswerOptions([]);
    }
  };

  const onOptionEnterPress = (index) => {
    setChangingElementAnswerOptions((prev) => {
      const newArr = [...prev];
      newArr.splice(index + 1, 0, "");
      return newArr;
    });
    setCurrentFocusedInputIndex(index + 1);
  };

  return (
    <>
      <Grid item xs={12}>
        <Paper elevation={3} className="paper">
          <Grid container className={classes["MuiGrid-spacing-xs-2"]} spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                label="Текст вопроса"
                variant="outlined"
                value={changingElementQuestion}
                onChange={(e) => changeQuestionText(e.target.value)}
              />
            </Grid>
            <SurveyElementAnswerParametersEditor
              selectedTypeIndex={selectedTypeIndex}
              elementAnswerRequired={changingElementAnswerRequired}
              elementOtherOptionAllowed={changingElementOtherOptionAllowed}
              ANSWER_TYPES_FOR_SELECT={ANSWER_TYPES_FOR_SELECT}
              changeAnswerType={changeAnswerType}
              changeAnswerRequired={changeAnswerRequired}
              changeOtherOptionAllowed={changeOtherOptionAllowed}
            />
            <SurveyElementAnswerTemplateEditor
              type={selectedTypeIndex}
              answerOptions={changingElementAnswerOptions}
              otherOptionAllowed={changingElementOtherOptionAllowed}
              changeOptionText={changeOptionText}
              removeOption={removeOption}
              onOptionEnterPress={onOptionEnterPress}
              currentFocusedInputIndex={currentFocusedInputIndex}
              createdInputRef={createdInputRef}
            />
            <NewSurveyChangingElementMainButtons
              type={selectedTypeIndex}
              addOption={addOption}
              resetChanges={resetChanges}
              saveChanges={saveChangedSurveyElement}
            />
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}

export default NewSurveyChangingElement;
