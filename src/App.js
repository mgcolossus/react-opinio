import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { MainPage, LoginPage, SignupPage, SurveysPage, SurveyFormPage, NotFoundPage } from "./components";
import { useAuth } from "./contexts/AuthContext";
import { SurveyErrorProvider } from "./contexts/SurveyErrorContext";
import "./App.scss";

function App() {
  const { currentUser } = useAuth();
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/surveys">
          {currentUser ? (
            <>
              <div className="bgс-block_purple"></div>
              <SurveyErrorProvider>
                <SurveysPage />
              </SurveyErrorProvider>
            </>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/login">
          {currentUser ? (
            <Redirect to="/surveys" />
          ) : (
            <>
              <div className="bgс-block_purple"></div>
              <LoginPage />
            </>
          )}
        </Route>
        <Route path="/signup">
          {currentUser ? (
            <Redirect to="/surveys" />
          ) : (
            <>
              <div className="bgс-block_purple"></div>
              <SignupPage />
            </>
          )}
        </Route>
        <Route path="/forms/:surveyLinkToken">
          <>
            <div className="bgс-block_purple"></div>
            <SurveyFormPage />
          </>
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
