import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";

function DeleteSurveyDialog({
  isDeleteSurveyDialogOpen,
  closeDeleteSurveyDialog,
  handleSurveyRemoval,
  surveyTitle
}) {
  return (
    <Dialog open={isDeleteSurveyDialogOpen} onClose={closeDeleteSurveyDialog}>
      <DialogTitle>Подтверждение</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`Вы действительно хотите удалить опрос ${surveyTitle} ?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSurveyRemoval} color="primary">
          Да
        </Button>
        <Button onClick={closeDeleteSurveyDialog} color="primary">
          Нет
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteSurveyDialog;
