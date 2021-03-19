import React from "react";
import { Grid, Button, Tabs, Tab } from "@material-ui/core";
import LinkIcon from "@material-ui/icons/Link";
import useMediaQuery from "@material-ui/core/useMediaQuery";

function SavedSurveyHeader({tabValue, changeTab, openGetLinkDialog}) {
  const isSmBreakpoint = useMediaQuery("(max-width: 600px)");
  return (
    <>
      {isSmBreakpoint ? (
        <>
          <Grid item xs={12}>
            <Tabs
              value={tabValue}
              onChange={changeTab}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example">
              <Tab value={0} label="Вопросы" />
              <Tab value={1} label="Ответы" />
            </Tabs>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="default"
              startIcon={<LinkIcon />}
              size="small"
              onClick={openGetLinkDialog}>
              ссылка на опрос
            </Button>
          </Grid>
        </>
      ) : (
        <Grid item container xs={12} justify="space-between" alignItems="center">
          <Grid item md={7}>
            <Tabs
              value={tabValue}
              onChange={changeTab}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example">
              <Tab value={0} label="Вопросы" />
              <Tab value={1} label="Ответы" />
            </Tabs>
          </Grid>
          <Grid item md={4}>
            <Button
              fullWidth
              variant="contained"
              color="default"
              startIcon={<LinkIcon />}
              size="small"
              onClick={openGetLinkDialog}>
              ссылка на опрос
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default SavedSurveyHeader;
