import React from "react";
import NewSurveyChangingElement from "./NewSurveyChangingElement";
import SurveyElement from "../../shared/SurveyElement";
import NewSurveyNewElement from "./NewSurveyNewElement";

function NewSurveyElements({
  newSurveyElements,
  setNewSurveyElements,
  changingElementIndex,
  setChangingElementIndex,
  setError,
}) {
  const handleChangeElement = (elementIndex) => {
    setChangingElementIndex(elementIndex);
  };

  const handleRemoveElement = (elementIndex) => {
    setNewSurveyElements((prevState) => {
      const newState = [...prevState];
      newState.splice(elementIndex, 1);
      return newState;
    });
  };

  const moveElementUp = (index) => {
    if (index === 0) {
      return;
    }
    setNewSurveyElements((prev) => {
      const elements = [...prev];
      [elements[index], elements[index - 1]] = [elements[index - 1], elements[index]];
      return elements;
    });
  };

  const moveElementDown = (index) => {
    if (index === newSurveyElements.length - 1) {
      return;
    }
    setNewSurveyElements((prev) => {
      const elements = [...prev];
      [elements[index], elements[index + 1]] = [elements[index + 1], elements[index]];
      return elements;
    });
  };

  return (
    <>
      {newSurveyElements.map((elementData, index) => {
        if (index === changingElementIndex) {
          return (
            <NewSurveyChangingElement
              key={elementData.elementId}
              elementData={elementData}
              setError={setError}
              setNewSurveyElements={setNewSurveyElements}
              setChangingElementIndex={setChangingElementIndex}
              changingElementIndex={changingElementIndex}
            />
          );
        }
        return (
          <SurveyElement
            key={elementData.elementId}
            elementData={elementData}
            index={index}
            handleChangeElement={handleChangeElement}
            handleRemoveElement={handleRemoveElement}
            moveElementUp={index !== 0 && changingElementIndex === null ? moveElementUp : null}
            moveElementDown={
              index !== newSurveyElements.length - 1 && changingElementIndex === null ? moveElementDown : null
            }
          />
        );
      })}
      <NewSurveyNewElement setError={setError} setNewSurveyElements={setNewSurveyElements} />
    </>
  );
}

export default NewSurveyElements;
