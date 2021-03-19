import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { LoginPage, SignupPage, SurveysPage, SurveyFormPage, NotFoundPage } from "./components";
import { useAuth } from "./contexts/AuthContext";
import { SurveyErrorProvider } from "./contexts/SurveyErrorContext";
import "./App.scss";

function App() {
  const { currentUser } = useAuth();
  return (
    <Switch>
      <Route path="/" exact>
        {currentUser ? (
          <SurveyErrorProvider>
            <SurveysPage />
          </SurveyErrorProvider>
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
      <Route path="/login">{currentUser ? <Redirect to="/" /> : <LoginPage />}</Route>
      <Route path="/signup">{currentUser ? <Redirect to="/" /> : <SignupPage />}</Route>
      <Route path="/forms/:surveyLinkToken">
        <SurveyFormPage />
      </Route>
      <Route path='*'>
        <NotFoundPage />
      </Route>
    </Switch>
  );
}

export default App;
