import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
} from "@material-ui/core";
import CachedIcon from "@material-ui/icons/Cached";

function SavedSurveyGetLinkDialog({ isOpen, onClose, surveyId }) {
  const [surveyLinkText, setSurveyLinkText] = useState("");
  useEffect(() => {
    const getSurveyLink = async () => {
      const response = await fetch(
        `https://myreactapp.site/api/surveys/link/${surveyId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const linkText = await response.text();
      setSurveyLinkText(linkText);
    };
    getSurveyLink();
  }, []);

  const recreateSurveyLink = async () => {
    const response = await fetch(
      `https://myreactapp.site/api/surveys/link/recreate/${surveyId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const linkText = await response.text();
    setSurveyLinkText(linkText);
  };

  const copyLinkToClipboard = () => {
    const input = document.getElementById("survey-link");
    input.value = surveyLinkText;
    input.select();
    document.execCommand('copy');
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Ссылка на опрос</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField value={surveyLinkText} id="survey-link" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  onClick={recreateSurveyLink}
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<CachedIcon />}>
                  Пересоздать ссылку
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  onClick={copyLinkToClipboard}
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<CachedIcon />}>
                  Копировать
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default SavedSurveyGetLinkDialog;
