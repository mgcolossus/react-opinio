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
          />
        );
      })}
      <NewSurveyNewElement setError={setError} setNewSurveyElements={setNewSurveyElements} />
    </>
  );
}

export default NewSurveyElements;
