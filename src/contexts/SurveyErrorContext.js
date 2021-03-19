import React, { useState, useEffect, useContext } from "react";

const SurveyErrorContext = React.createContext();

export function useSurveyError() {
  return useContext(SurveyErrorContext);
}

export function SurveyErrorProvider({ children }) {
  const [error, setError] = useState("");
  useEffect(() => {
    if (error !== "") {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);
  return <SurveyErrorContext.Provider value={{ error, setError }}>{children}</SurveyErrorContext.Provider>;
}
