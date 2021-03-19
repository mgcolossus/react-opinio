import React, { useEffect, useState } from "react";
import { Container, Grid, Paper } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import SurveysStore from "../../stores/surveyDataStore";
import { NewSurvey } from "./NewSurvey";
import NoSurveyInstruction from "./NoSurveyInstruction";
import { SavedSurvey } from "./SavedSurvey";
import { SurveySelectorList } from "./SurveySelectorList";
import SurveysPageAppBar from "./SurveysPageAppBar";
import { useSurveyError } from "./../../contexts/SurveyErrorContext";
import ErrorPopup from "./SurveyError/SurveyErrorPopup";

function SelectedSurvey({
  selectedSurveyIndex,
  isNewSurveySelected,
  setError,
  surveysData,
  setSelectedSurveyIndex,
  setIsNewSurveySelected,
}) {
  if (selectedSurveyIndex === null && isNewSurveySelected === false) {
    return <NoSurveyInstruction />;
  } else if (selectedSurveyIndex !== null && isNewSurveySelected === false) {
    return <SavedSurvey surveyData={surveysData[selectedSurveyIndex]} setError={setError} />;
  } else if (selectedSurveyIndex === null && isNewSurveySelected) {
    return (
      <NewSurvey
        setError={setError}
        surveysData={surveysData}
        setSelectedSurveyIndex={setSelectedSurveyIndex}
        setIsNewSurveySelected={setIsNewSurveySelected}
      />
    );
  } else {
    throw Error(
      `Error: selectedSurveyIndex and isNewSurveySelected are both truthy: selectedSurveyIndex = ${selectedSurveyIndex};\n isNewSurveySelected = ${isNewSurveySelected}`
    );
  }
}

function SurveysPage() {
  const surveysData = SurveysStore.data;
  const [selectedSurveyIndex, setSelectedSurveyIndex] = useState(null);
  const [isNewSurveySelected, setIsNewSurveySelected] = useState(false);
  const { setError } = useSurveyError();

  useEffect(() => {
    SurveysStore.getAllSurveysFromServer();
  }, []);

  const handleSurveySelected = (surveyIndex) => {
    if (surveyIndex > surveysData.length) {
      console.error("surveyIndex is out of range in handleSurveySelected()");
    } else {
      setSelectedSurveyIndex(surveyIndex);
      setIsNewSurveySelected(false);
    }
  };

  const handleNewSurveySelected = () => {
    setSelectedSurveyIndex(null);
    setIsNewSurveySelected(true);
  };

  return (
    <div className="main-container">
      <SurveysPageAppBar />
      <ErrorPopup />
      <Container className="main-mui-container">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <SurveySelectorList
              surveysData={surveysData}
              selectedSurveyIndex={selectedSurveyIndex}
              setSelectedSurveyIndex={setSelectedSurveyIndex}
              handleSurveySelected={handleSurveySelected}
              handleNewSurveySelected={handleNewSurveySelected}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} className="paper">
              <SelectedSurvey
                selectedSurveyIndex={selectedSurveyIndex}
                isNewSurveySelected={isNewSurveySelected}
                setError={setError}
                surveysData={surveysData}
                setSelectedSurveyIndex={setSelectedSurveyIndex}
                setIsNewSurveySelected={setIsNewSurveySelected}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default observer(SurveysPage);
