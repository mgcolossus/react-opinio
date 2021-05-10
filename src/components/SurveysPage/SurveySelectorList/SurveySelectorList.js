import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteSurveyDialog from "./DeleteSurveyDialog";
import SurveysStore from "../../../stores/surveyDataStore";
import { observer } from "mobx-react-lite";

function SurveySelectorList(props) {
  const loading = SurveysStore.loading;
  const [isDeleteSurveyDialogOpen, setIsDeleteSurveyDialogOpen] = useState(false);
  const [surveyToRemoveIndex, setSurveyToRemoveIndex] = useState(null);

  const showDeleteSurveyDialog = (surveyIndex) => {
    setSurveyToRemoveIndex(surveyIndex);
    setIsDeleteSurveyDialogOpen(true);
  };

  const closeDeleteSurveyDialog = () => {
    setIsDeleteSurveyDialogOpen(false);
    setSurveyToRemoveIndex(null);
  };

  const handleSurveyRemoval = () => {
    closeDeleteSurveyDialog();
    props.setSelectedSurveyIndex(null);
    SurveysStore.deleteSurveyFromServer(props.surveysData[surveyToRemoveIndex].surveyId);
    SurveysStore.getAllSurveysFromServer();
  };

  const getSurveyListItems = (surveysData) => {
    return surveysData.map((survey, index) => {
      return (
        <ListItem
          key={survey.surveyId}
          selected={props.selectedSurveyIndex === index}
          button
          onClick={() => props.handleSurveySelected(index)}>
          <ListItemText>
            <Typography noWrap>{survey.title}</Typography>
          </ListItemText>
          <ListItemSecondaryAction>
            <IconButton onClick={() => showDeleteSurveyDialog(index)} edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
  };

  return (
    <Paper elevation={3} className="paper">
      <Typography variant="h6" color="primary">
        Мои опросы
      </Typography>
      {loading ? (
        <div className="progress-circle-wrapper">
          <CircularProgress />
        </div>
      ) : (
        <>
          <List>
            {getSurveyListItems(props.surveysData)}
            <ListItem button onClick={props.handleNewSurveySelected}>
              <ListItemText
                primaryTypographyProps={{
                  color: "primary",
                }}
                primary="Создать новый опрос"
              />
            </ListItem>
          </List>
          {isDeleteSurveyDialogOpen ? (
            <DeleteSurveyDialog
              isDeleteSurveyDialogOpen={isDeleteSurveyDialogOpen}
              closeDeleteSurveyDialog={closeDeleteSurveyDialog}
              handleSurveyRemoval={handleSurveyRemoval}
              surveyTitle={props.surveysData[surveyToRemoveIndex].title}
            />
          ) : null}
        </>
      )}
    </Paper>
  );
}

export default observer(SurveySelectorList);
